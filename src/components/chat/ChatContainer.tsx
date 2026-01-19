import { motion } from 'framer-motion'
import { Trash2, X } from 'lucide-react'
import { MessageList } from './MessageList'
import { ChatInput } from './ChatInput'
import { useGeminiChat } from './useGeminiChat'
import { useI18n } from '@/lib/i18n'
import { AvatarAI } from './AvatarAI'

interface ChatContainerProps {
  onClose: () => void
}

export function ChatContainer({ onClose }: ChatContainerProps) {
  const { t } = useI18n()
  const { messages, isLoading, error, provider, orchestrationStatus, sendMessage, clearMessages } = useGeminiChat()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 md:absolute md:inset-auto md:bottom-20 md:right-0 md:h-[520px] md:w-[380px] md:rounded-2xl md:shadow-2xl md:shadow-black/50"
    >
      {/* Header - Premium gradient */}
      <div className="relative flex items-center justify-between bg-gradient-to-r from-teal-600 via-teal-500 to-cyan-500 px-4 py-3 shadow-lg">
        {/* Decorative wave */}
        <div className="absolute inset-x-0 -bottom-3 h-4 overflow-hidden">
          <svg className="h-full w-full" viewBox="0 0 400 20" preserveAspectRatio="none">
            <path d="M0,10 Q50,0 100,10 T200,10 T300,10 T400,10 L400,20 L0,20 Z" fill="rgb(15 23 42)" />
          </svg>
        </div>

        <div className="flex items-center gap-3">
          {/* Avatar Animado */}
          <AvatarAI size="md" isThinking={isLoading} />
          <div>
            <h3 className="font-semibold text-white">Click AI</h3>
            <p className="text-xs text-white/80">{t.chat.online}</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {messages.length > 0 && (
            <button
              onClick={clearMessages}
              className="rounded-lg p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              title={t.chat.clearChat}
            >
              <Trash2 className="h-5 w-5" strokeWidth={1.5} />
            </button>
          )}
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="h-5 w-5" strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Error Toast */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-4 mt-4 rounded-xl bg-red-500/20 px-4 py-2 text-center text-sm text-red-300 backdrop-blur-sm"
        >
          {error}
        </motion.div>
      )}

      {/* Orchestration Status - Sutil */}
      {orchestrationStatus && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="mx-4 mt-2"
        >
          <div className="flex items-center justify-center gap-2 text-xs text-teal-400">
            <span className="flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-1.5 w-1.5 animate-ping rounded-full bg-teal-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-teal-400" />
            </span>
            <span>{orchestrationStatus}</span>
          </div>
        </motion.div>
      )}

      {/* Messages */}
      <MessageList messages={messages} isLoading={isLoading} onQuickReply={sendMessage} />

      {/* Input */}
      <ChatInput onSend={sendMessage} isLoading={isLoading} provider={provider} />
    </motion.div>
  )
}
