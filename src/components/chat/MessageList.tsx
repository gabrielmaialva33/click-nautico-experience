import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Wind, DollarSign, Ship, Calendar } from 'lucide-react'
import { MessageBubble } from './MessageBubble'
import { AvatarAI } from './AvatarAI'
import { useI18n } from '@/lib/i18n'
import type { Message } from './types'

interface MessageListProps {
  messages: Message[]
  isLoading: boolean
  onQuickReply?: (message: string) => void
}

const quickReplies = [
  { icon: Wind, text: 'Aulas de Kite' },
  { icon: DollarSign, text: 'Preços' },
  { icon: Ship, text: 'Passeios' },
  { icon: Calendar, text: 'Disponibilidade' },
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
        {/* Avatar Animado Grande */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <AvatarAI size="lg" />
        </motion.div>

        {/* Greeting */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="text-center"
        >
          <h3 className="mb-2 text-xl font-display font-bold text-white tracking-tight">
            {t.chat.greeting}
          </h3>
          <p className="mb-8 text-sm text-ocean-100 font-light leading-relaxed max-w-[200px] mx-auto">
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
              className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-medium text-ocean-100 transition-all hover:border-ocean-400/50 hover:bg-ocean-500/10 hover:text-white hover:shadow-lg hover:shadow-ocean-500/20 active:scale-95"
            >
              <reply.icon className="h-3.5 w-3.5 text-ocean-300 group-hover:text-ocean-200 transition-colors" />
              <span>{reply.text}</span>
            </button>
          ))}
        </motion.div>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
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

      {/* Typing indicator com Avatar Animado */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 pl-2"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-ocean-400 blur-md opacity-20 rounded-full" />
            <AvatarAI size="sm" isThinking />
          </div>
          <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm bg-white/5 border border-white/5 px-4 py-3 backdrop-blur-sm">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="h-1.5 w-1.5 rounded-full bg-ocean-300"
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
