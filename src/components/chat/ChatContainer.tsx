import { m } from 'framer-motion'
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
    <m.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-sand-950/95 md:bg-sand-950/60 backdrop-blur-xl md:absolute md:inset-auto md:bottom-24 md:right-0 md:h-[600px] md:w-[400px] md:rounded-3xl border-none md:border md:border-white/10 shadow-none md:shadow-2xl md:shadow-black/50"
    >
      {/* Background Glow */}
      <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-b from-ocean-500/10 via-transparent to-transparent pointer-events-none" />

      {/* Header - Glass & Gradient */}
      <div className="relative flex items-center justify-between border-b border-white/10 bg-white/5 px-5 py-4 backdrop-blur-md">

        <div className="flex items-center gap-3">
          {/* Avatar Animado */}
          <div className="relative">
            <div className="absolute inset-0 bg-ocean-400 blur-lg opacity-20 rounded-full" />
            <AvatarAI size="md" isThinking={isLoading} />
          </div>
          <div>
            <h3 className="font-display font-bold text-white text-lg tracking-tight">Click AI</h3>
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ocean-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-ocean-500"></span>
              </span>
              <p className="text-xs text-ocean-200 font-medium">{t.chat.online}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {messages.length > 0 && (
            <button
              onClick={clearMessages}
              className="rounded-full p-2 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
              title={t.chat.clearChat}
            >
              <Trash2 className="h-4 w-4" strokeWidth={2} />
            </button>
          )}
          <button
            onClick={onClose}
            className="rounded-full p-2 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="h-5 w-5" strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Error Toast */}
      {error && (
        <m.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-4 mt-4 rounded-xl bg-red-500/20 border border-red-500/30 px-4 py-3 text-center text-sm text-red-200 backdrop-blur-md"
        >
          {error}
        </m.div>
      )}

      {/* Orchestration Status - Modern Pill */}
      {orchestrationStatus && (
        <m.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="absolute top-20 left-0 right-0 z-10 flex justify-center pointer-events-none"
        >
          <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-full px-3 py-1 text-[10px] font-medium text-ocean-300">
            <div className="h-1.5 w-1.5 rounded-full bg-ocean-400 animate-pulse" />
            <span>{orchestrationStatus}</span>
          </div>
        </m.div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-hidden relative">
        <MessageList messages={messages} isLoading={isLoading} onQuickReply={sendMessage} />
      </div>

      {/* Input */}
      <ChatInput onSend={sendMessage} isLoading={isLoading} provider={provider} />
    </m.div>
  )
}
