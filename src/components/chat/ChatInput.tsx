import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useI18n } from '@/lib/i18n'

interface ChatInputProps {
  onSend: (message: string) => void
  isLoading: boolean
  provider?: 'google' | 'nvidia'
}

export function ChatInput({ onSend, isLoading }: ChatInputProps) {
  const { t } = useI18n()
  const [input, setInput] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 100)}px`
    }
  }, [input])

  const handleSubmit = () => {
    if (input.trim() && !isLoading) {
      onSend(input)
      setInput('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div
      className="p-4 bg-transparent"
      style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
    >
      <div className="relative flex items-end gap-2 rounded-[2rem] bg-white/5 border border-white/10 p-1.5 focus-within:bg-white/10 focus-within:border-white/20 transition-all duration-300 ring-1 ring-black/20">
        <div className="flex-1 min-w-0">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t.chat.placeholder}
            disabled={isLoading}
            rows={1}
            className="w-full resize-none bg-transparent px-4 py-3 text-sm text-white placeholder-gray-500 outline-none disabled:opacity-50 max-h-32"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit}
          disabled={!input.trim() || isLoading}
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-ocean-500 hover:bg-ocean-400 text-white shadow-lg transition-all disabled:opacity-0 disabled:scale-50 mb-1 mr-1"
        >
          {isLoading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
            />
          ) : (
            <svg
              className="h-4 w-4 ml-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M5 12h14M12 5l7 7-7 7"
              />
            </svg>
          )}
        </motion.button>
      </div>

      {/* Powered by */}
      <p className="mt-2 text-center text-[10px] text-gray-500 opacity-50 font-medium tracking-wide">
        Powered by Click AI &trade;
      </p>
    </div>
  )
}
