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
        className={`max-w-[85%] md:max-w-[80%] px-5 py-3.5 shadow-sm ${isUser
            ? 'rounded-2xl rounded-tr-sm bg-gradient-to-br from-ocean-500 to-ocean-600 text-white'
            : 'rounded-2xl rounded-tl-sm bg-white/10 text-gray-100 border border-white/5 backdrop-blur-sm'
          }`}
      >

        <p className="whitespace-pre-wrap text-sm leading-relaxed font-light tracking-wide">
          {message.content || (showThinking && (
            <span className="flex items-center gap-1.5 py-1">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="h-1.5 w-1.5 rounded-full bg-ocean-300"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </span>
          ))}
        </p>

        {/* Timestamp */}
        <div className={`mt-1.5 flex items-center justify-end gap-1 text-[10px] uppercase tracking-wider font-medium ${isUser ? 'text-white/70' : 'text-gray-400'}`}>
          <span>
            {message.timestamp.toLocaleTimeString('pt-BR', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
          {/* Check marks for user messages */}
          {isUser && (
            <Check className="h-3 w-3 opacity-80" />
          )}
        </div>
      </div>
    </motion.div>
  )
}
