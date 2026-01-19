import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageBubble } from './MessageBubble'
import { useI18n } from '@/lib/i18n'
import type { Message } from './types'

interface MessageListProps {
  messages: Message[]
  isLoading: boolean
  onQuickReply?: (message: string) => void
}

const quickReplies = [
  { emoji: '🏄', text: 'Aulas de Kite' },
  { emoji: '💰', text: 'Preços' },
  { emoji: '🚤', text: 'Passeios' },
  { emoji: '📅', text: 'Disponibilidade' },
]

export function MessageList({ messages, isLoading, onQuickReply }: MessageListProps) {
  const { t } = useI18n()
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  if (messages.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-8">
        {/* Avatar grande */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-cyan-400 text-4xl shadow-lg shadow-teal-500/30"
        >
          🏄‍♂️
        </motion.div>

        {/* Greeting */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="text-center"
        >
          <h3 className="mb-2 text-xl font-semibold text-white">
            {t.chat.greeting}
          </h3>
          <p className="mb-6 text-sm text-slate-400">
            {t.chat.greetingDesc}
          </p>
        </motion.div>

        {/* Quick Replies */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2"
        >
          {quickReplies.map((reply) => (
            <button
              key={reply.text}
              onClick={() => onQuickReply?.(reply.text)}
              className="flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-800/50 px-4 py-2 text-sm text-slate-300 transition-all hover:border-teal-500/50 hover:bg-slate-800 hover:text-white active:scale-95"
            >
              <span>{reply.emoji}</span>
              <span>{reply.text}</span>
            </button>
          ))}
        </motion.div>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
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

      {/* Typing indicator */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-cyan-400 text-sm">
            🏄‍♂️
          </div>
          <div className="flex items-center gap-1 rounded-2xl rounded-bl-none bg-slate-800 px-4 py-3">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="h-2 w-2 rounded-full bg-teal-400"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </motion.div>
      )}

      <div ref={bottomRef} />
    </div>
  )
}
