import { motion } from 'framer-motion'
import type { Message } from './types'

interface MessageBubbleProps {
  message: Message
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user'

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 ${
          isUser
            ? 'rounded-br-md bg-gradient-to-r from-cyan-600 to-cyan-700 text-white'
            : 'rounded-bl-md bg-white/10 text-white backdrop-blur-sm'
        }`}
      >
        {!isUser && (
          <div className="mb-1">
            <span className="text-xs font-medium text-cyan-400">Click AI</span>
          </div>
        )}
        <p className="whitespace-pre-wrap text-sm leading-relaxed">
          {message.content}
        </p>
        <span className="mt-1 block text-right text-[10px] opacity-50">
          {message.timestamp.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      </div>
    </motion.div>
  )
}
