import { motion } from 'framer-motion'
import { MessageList } from './MessageList'
import { ChatInput } from './ChatInput'
import { AvatarAI } from './AvatarAI'
import { useGeminiChat } from './useGeminiChat'
import { useI18n } from '@/lib/i18n'

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
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="flex h-[500px] w-[360px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-cyan-900/95 to-cyan-950/95 shadow-2xl backdrop-blur-xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 bg-black/20 px-4 py-3">
        <div className="flex items-center gap-3">
          <AvatarAI size="md" isThinking={isLoading} />
          <div>
            <h3 className="font-semibold text-white">Click AI</h3>
            <p className="text-xs text-cyan-400">{t.chat.online}</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {messages.length > 0 && (
            <button
              onClick={clearMessages}
              className="rounded-lg p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
              title={t.chat.clearChat}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Error Toast */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-4 mt-2 rounded-lg bg-red-500/20 px-3 py-2 text-center text-sm text-red-300"
        >
          {error}
        </motion.div>
      )}

      {/* Orchestration Status */}
      {orchestrationStatus && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="border-b border-white/5 bg-cyan-950/50 px-4 py-1"
        >
          <div className="flex items-center gap-2 text-xs text-cyan-300">
            <span className="flex h-2 w-2">
              <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500"></span>
            </span>
            <span className="animate-pulse">{orchestrationStatus}</span>
          </div>
        </motion.div>
      )}

      {/* Messages */}
      <MessageList messages={messages} isLoading={isLoading} />

      {/* Input */}
      <ChatInput onSend={sendMessage} isLoading={isLoading} provider={provider} />
    </motion.div>
  )
}
