import { useState, useCallback, useRef } from 'react'
import {
  genAI,
  GOOGLE_MODEL,
  SYSTEM_PROMPTS,
  type AIProvider,
  type NvidiaMessage,
} from '@/lib/ai'
import { AIOrchestrator } from '@/lib/ai-orchestrator'
import { useVisitorStore } from '@/store/visitorStore'
import { useI18n } from '@/lib/i18n'
import type { Message, ChatState } from './types'

const generateId = () => Math.random().toString(36).substring(2, 9)

// Remove <think>...</think> tags from NVIDIA responses (internal reasoning)
const stripThinkingTags = (text: string): string => {
  return text.replace(/<think>[\s\S]*?<\/think>\s*/gi, '').trim()
}

export function useGeminiChat() {
  const { locale } = useI18n()
  const [state, setState] = useState<ChatState>({
    messages: [],
    isLoading: false,
    error: null,
  })
  const [provider, setProvider] = useState<AIProvider>('google')

  const historyRef = useRef<{ role: string; parts: { text: string }[] }[]>([])
  const nvidiaHistoryRef = useRef<NvidiaMessage[]>([])

  const sendWithGoogle = useCallback(
    async (content: string, assistantMessageId: string) => {
      const model = genAI.getGenerativeModel({ model: GOOGLE_MODEL })

      const chatHistory = historyRef.current.map((msg) => ({
        role: msg.role as 'user' | 'model',
        parts: msg.parts,
      }))

      const chat = model.startChat({
        history: chatHistory,
        generationConfig: {
          maxOutputTokens: 1000,
          temperature: 0.8,
        },
        systemInstruction: {
          role: 'user',
          parts: [{ text: SYSTEM_PROMPTS[locale] }],
        },
      })

      const result = await chat.sendMessageStream(content)

      let fullResponse = ''

      for await (const chunk of result.stream) {
        const chunkText = chunk.text()
        fullResponse += chunkText

        setState((prev) => ({
          ...prev,
          messages: prev.messages.map((msg) =>
            msg.id === assistantMessageId ? { ...msg, content: fullResponse } : msg
          ),
        }))
      }

      // Update history
      historyRef.current.push(
        { role: 'user', parts: [{ text: content }] },
        { role: 'model', parts: [{ text: fullResponse }] }
      )

      return fullResponse
    },
    [locale]
  )

  /* New: Visitor Store Integration */
  const {
    name: visitorName,
    role: visitorRole,
    context: visitorContext,
    setName: setVisitorName,
    setRole: setVisitorRole
  } = useVisitorStore()

  /* New State for UI feedback */
  const [orchestrationStatus, setOrchestrationStatus] = useState<string | null>(null)

  const sendWithNvidia = useCallback(
    async (content: string, assistantMessageId: string) => {
      const orchestrator = new AIOrchestrator(locale)

      // 1. Determine Intent
      setOrchestrationStatus('Pensando...')

      // Basic attachment check (mock for now as UI doesn't expose file input yet)
      const intent = await orchestrator.classifyIntent(content, false)

      // 2. Select Model - don't show model name to user
      orchestrator.selectModel(intent)
      setOrchestrationStatus(null)

      const messages: NvidiaMessage[] = [
        ...nvidiaHistoryRef.current,
        { role: 'user', content },
      ]

      // Prepare Visitor Context
      const currentVisitorData = {
        name: visitorName,
        role: visitorRole,
        context: visitorContext
      }

      let fullResponse = ''

      try {
        // 3. Stream with selected model AND Visitor Context
        const generator = orchestrator.executeWithContext(intent, messages, currentVisitorData)

        for await (const chunk of generator) {
          fullResponse += chunk
          // Parse tools on the fly or just display raw?
          // Better to display raw and clean up at the end to avoid flickering
          const displayText = stripThinkingTags(fullResponse)

          setState((prev) => ({
            ...prev,
            messages: prev.messages.map((msg) =>
              msg.id === assistantMessageId ? { ...msg, content: displayText } : msg
            ),
          }))

          // Clear status once streaming starts
          setOrchestrationStatus(null)
        }
      } catch (err) {
        console.error("NVIDIA Stream Error", err)
        throw err
      } finally {
        setOrchestrationStatus(null)
      }

      // 4. Process Client Tools (Post-generation)
      const { cleanedResponse, actions } = orchestrator.processClientTools(fullResponse)

      // Execute actions
      if (actions.length > 0) {
        actions.forEach(action => {
          console.log('Executing Client Tool:', action)
          if (action.type === 'SAVE_NAME') setVisitorName(action.payload)
          if (action.type === 'SAVE_ROLE') setVisitorRole(action.payload)
        })

        // Update the displayed message to remove the tags
        setState((prev) => ({
          ...prev,
          messages: prev.messages.map((msg) =>
            msg.id === assistantMessageId ? { ...msg, content: stripThinkingTags(cleanedResponse) } : msg
          ),
        }))
      }

      // Update NVIDIA history (clean version)
      nvidiaHistoryRef.current.push(
        { role: 'user', content },
        { role: 'assistant', content: stripThinkingTags(cleanedResponse) }
      )

      return cleanedResponse
    },
    [locale, visitorName, visitorRole, visitorContext, setVisitorName, setVisitorRole]
  )

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || state.isLoading) return

      const userMessage: Message = {
        id: generateId(),
        role: 'user',
        content: content.trim(),
        timestamp: new Date(),
      }

      const assistantMessage: Message = {
        id: generateId(),
        role: 'assistant',
        content: '',
        timestamp: new Date(),
      }

      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, userMessage, assistantMessage],
        isLoading: true,
        error: null,
      }))

      try {
        await sendWithGoogle(content, assistantMessage.id)
        setProvider('google')
        setState((prev) => ({ ...prev, isLoading: false }))
      } catch (error) {
        console.error('Google AI error, trying NVIDIA fallback:', error)

        // Try NVIDIA as fallback
        try {
          await sendWithNvidia(content, assistantMessage.id)
          setProvider('nvidia')
          setState((prev) => ({ ...prev, isLoading: false }))
        } catch (nvidiaError) {
          console.error('NVIDIA fallback error:', nvidiaError)
          setState((prev) => ({
            ...prev,
            isLoading: false,
            error: locale === 'pt'
              ? 'Ops! Algo deu errado. Tenta de novo?'
              : locale === 'es'
                ? 'Algo salio mal. Intentas de nuevo?'
                : 'Oops! Something went wrong. Try again?',
            messages: prev.messages.filter((m) => m.id !== assistantMessage.id),
          }))
        }
      }
    },
    [state.isLoading, sendWithGoogle, sendWithNvidia, locale]
  )

  const clearMessages = useCallback(() => {
    setState({
      messages: [],
      isLoading: false,
      error: null,
    })
    historyRef.current = []
    nvidiaHistoryRef.current = []
  }, [])

  return {
    messages: state.messages,
    isLoading: state.isLoading,
    error: state.error,
    provider,
    orchestrationStatus,
    sendMessage,
    clearMessages,
  }
}
