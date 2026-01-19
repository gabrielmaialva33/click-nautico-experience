import { useEffect, useRef } from 'react'
import { AnimatePresence } from 'framer-motion'
import { MessageBubble } from './MessageBubble'
import { useI18n } from '@/lib/i18n'
import { AvatarAI } from './AvatarAI'
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
        <AvatarAI size="lg" className="mb-4" />
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
        {messages.map((message, index) => (
          <MessageBubble
            key={message.id}
            message={message}
            isLatest={index === messages.length - 1}
            isLoading={isLoading}
          />
        ))}
      </AnimatePresence>

      <div ref={bottomRef} />
    </div>
  )
}
