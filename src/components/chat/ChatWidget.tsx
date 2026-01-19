import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
      <div className={`fixed bottom-20 right-4 z-50 flex flex-col items-end gap-4 md:bottom-6 md:right-6 ${isOpen ? 'hidden md:flex' : ''}`}>
        {/* Tooltip on hover */}
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden md:group-hover:block"
          />
        )}

        {/* Toggle Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Chat AI"
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 shadow-lg shadow-teal-500/30 transition-all hover:shadow-xl hover:shadow-teal-500/40"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-6 w-6 text-white" strokeWidth={2.5} />
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <MessageCircle className="h-6 w-6 text-white" strokeWidth={2} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pulse animation when closed */}
          {!isOpen && (
            <>
              <span className="absolute inset-0 animate-ping rounded-full bg-teal-500 opacity-20" />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-white shadow-sm">
                AI
              </span>
            </>
          )}

          {/* Tooltip */}
          {!isOpen && (
            <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-lg bg-slate-800 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-xl transition-opacity group-hover:opacity-100">
              {t.chat.tooltip}
            </span>
          )}
        </motion.button>
      </div>
    </>
  )
}
