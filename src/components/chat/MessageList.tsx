import { useEffect, useRef } from 'react'
import { AnimatePresence } from 'framer-motion'
import { MessageBubble } from './MessageBubble'
import { TypingIndicator } from './TypingIndicator'
import { useI18n } from '@/lib/i18n'
import type { Message } from './types'

interface MessageListProps {
  messages: Message[]
  isLoading: boolean
}

export function MessageList({ messages, isLoading }: MessageListProps) {
  const { t } = useI18n()
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  if (messages.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center p-6 text-center">
        <span className="mb-3 text-5xl">🌊</span>
        <h3 className="mb-2 text-lg font-semibold text-white">
          {t.chat.greeting}
        </h3>
        <p className="text-sm text-white/70">
          {t.chat.greetingDesc}
        </p>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-3 overflow-y-auto p-4">
      <AnimatePresence mode="popLayout">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
      </AnimatePresence>

      {isLoading && messages[messages.length - 1]?.role === 'user' && (
        <TypingIndicator />
      )}

      <div ref={bottomRef} />
    </div>
  )
}
