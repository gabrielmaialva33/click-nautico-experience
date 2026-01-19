import { useState } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import { MessageCircle, X } from 'lucide-react'
import { ChatContainer } from './ChatContainer'
import { useI18n } from '@/lib/i18n'

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useI18n()

  return (
    <>
      {/* Chat Container - full screen mobile, positioned desktop */}
      <AnimatePresence>
        {isOpen && <ChatContainer onClose={() => setIsOpen(false)} />}
      </AnimatePresence>

      {/* Toggle Button - hidden when chat is open on mobile */}
      <div className={`fixed bottom-4 right-4 z-50 flex flex-col items-end gap-4 md:right-6 ${isOpen ? 'hidden md:flex' : ''}`}>
        {/* Tooltip on hover */}
        {!isOpen && (
          <m.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden md:group-hover:block"
          />
        )}

        {/* Toggle Button */}
        <m.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Chat AI"
          className="group relative flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full bg-gradient-to-br from-ocean-500 to-ocean-600 shadow-lg shadow-ocean-500/30 transition-all hover:shadow-xl hover:shadow-ocean-500/40 border border-white/10"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <m.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-5 w-5 md:h-6 md:w-6 text-white" strokeWidth={2.5} />
              </m.div>
            ) : (
              <m.div
                key="chat"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <MessageCircle className="h-5 w-5 md:h-6 md:w-6 text-white" strokeWidth={2} />
              </m.div>
            )}
          </AnimatePresence>

          {/* Pulse animation when closed */}
          {!isOpen && (
            <>
              <span className="absolute inset-0 animate-ping rounded-full bg-ocean-400 opacity-20" />
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 md:h-5 md:w-5 items-center justify-center rounded-full bg-coral-500 text-[8px] md:text-[10px] font-bold text-white shadow-sm border border-white/20">
                AI
              </span>
            </>
          )}

          {/* Tooltip */}
          {!isOpen && (
            <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-lg bg-sand-900/90 backdrop-blur-md px-3 py-2 text-sm font-medium text-white opacity-0 shadow-xl transition-opacity group-hover:opacity-100 border border-white/10">
              {t.chat.tooltip}
            </span>
          )}
        </m.button>
      </div>
    </>
  )
}
