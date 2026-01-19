import { useState, useCallback, useRef } from 'react'
import {
  genAI,
  GOOGLE_MODEL,
  SYSTEM_PROMPTS,
  streamNvidiaChat,
  type AIProvider,
  type NvidiaMessage,
} from '@/lib/ai'
import { AIOrchestrator } from '@/lib/ai-orchestrator'
// Wait, AIOrchestrator is in './ai-orchestrator'.
// I need new import line.
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

  /* New State for UI feedback */
  const [orchestrationStatus, setOrchestrationStatus] = useState<string | null>(null)

  const sendWithNvidia = useCallback(
    async (content: string, assistantMessageId: string) => {
      const orchestrator = new AIOrchestrator(locale)

      // 1. Determine Intent
      setOrchestrationStatus('Analyzing intent...')
      const intent = await orchestrator.classifyIntent(content, false) // attachments support pending

      // 2. Select Model
      const model = orchestrator.selectModel(intent)
      setOrchestrationStatus(`Using ${model.split('/')[1]}...`) // Show "llama-3.3..."

      const messages: NvidiaMessage[] = [
        ...nvidiaHistoryRef.current,
        { role: 'user', content },
      ]

      let fullResponse = ''

      try {
        // 3. Stream with selected model
        for await (const chunk of streamNvidiaChat(messages, locale, model)) {
          fullResponse += chunk
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

      // Update NVIDIA history (without thinking tags)
      const cleanResponse = stripThinkingTags(fullResponse)
      nvidiaHistoryRef.current.push(
        { role: 'user', content },
        { role: 'assistant', content: cleanResponse }
      )

      return cleanResponse
    },
    [locale]
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
