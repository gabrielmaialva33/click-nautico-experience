import { useState, useCallback, useRef } from 'react'
import {
  genAI,
  GOOGLE_MODEL,
  SYSTEM_PROMPTS,
  type AIProvider,
} from '@/lib/ai'
import { useI18n } from '@/lib/i18n'
import type { Message, ChatState } from './types'

const generateId = () => Math.random().toString(36).substring(2, 9)

export function useGeminiChat() {
  const { locale } = useI18n()
  const [state, setState] = useState<ChatState>({
    messages: [],
    isLoading: false,
    error: null,
  })
  const [provider, setProvider] = useState<AIProvider>('google')

  const historyRef = useRef<{ role: string; parts: { text: string }[] }[]>([])

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
        console.error('Google AI error:', error)
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
    },
    [state.isLoading, sendWithGoogle, locale]
  )

  const clearMessages = useCallback(() => {
    setState({
      messages: [],
      isLoading: false,
      error: null,
    })
    historyRef.current = []
  }, [])

  return {
    messages: state.messages,
    isLoading: state.isLoading,
    error: state.error,
    provider,
    sendMessage,
    clearMessages,
  }
}
