import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { AvatarAI } from './AvatarAI'
import type { Message } from './types'

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
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
      className={`flex items-end gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {/* Avatar Animado - only for assistant */}
      {!isUser && (
        <AvatarAI size="sm" isThinking={showThinking} />
      )}

      <div
        className={`max-w-[80%] px-4 py-3 ${
          isUser
            ? 'rounded-2xl rounded-br-sm bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md shadow-blue-500/20'
            : 'rounded-2xl rounded-bl-sm bg-slate-800 text-slate-100 shadow-md'
        }`}
      >

        <p className="whitespace-pre-wrap text-sm leading-relaxed">
          {message.content || (showThinking && (
            <span className="flex items-center gap-1">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="text-teal-400"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                >
                  ●
                </motion.span>
              ))}
            </span>
          ))}
        </p>

        {/* Timestamp */}
        <div className={`mt-1 flex items-center justify-end gap-1 text-[10px] ${isUser ? 'text-white/60' : 'text-slate-500'}`}>
          <span>
            {message.timestamp.toLocaleTimeString('pt-BR', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
          {/* Check marks for user messages */}
          {isUser && (
            <Check className="h-3 w-3" />
          )}
        </div>
      </div>
    </motion.div>
  )
}
