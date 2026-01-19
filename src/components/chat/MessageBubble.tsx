import { motion } from 'framer-motion'
import type { Message } from './types'
import { AvatarAI } from './AvatarAI'

interface MessageBubbleProps {
  message: Message
  isLatest?: boolean
  isLoading?: boolean
}

export function MessageBubble({ message, isLatest = false, isLoading = false }: MessageBubbleProps) {
  const isUser = message.role === 'user'
  const showThinking = isLatest && isLoading && !isUser

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={`flex gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {/* Avatar - only for assistant */}
      {!isUser && (
        <AvatarAI size="sm" isThinking={showThinking} className="mt-1" />
      )}

      <div
        className={`max-w-[75%] rounded-2xl px-4 py-3 ${
          isUser
            ? 'rounded-br-md bg-gradient-to-r from-cyan-600 to-cyan-700 text-white'
            : 'rounded-bl-md bg-white/10 text-white backdrop-blur-sm'
        }`}
      >
        <p className="whitespace-pre-wrap text-sm leading-relaxed">
          {message.content || (showThinking && (
            <span className="flex items-center gap-1">
              <motion.span
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              >
                ●
              </motion.span>
              <motion.span
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}
              >
                ●
              </motion.span>
              <motion.span
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}
              >
                ●
              </motion.span>
            </span>
          ))}
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
