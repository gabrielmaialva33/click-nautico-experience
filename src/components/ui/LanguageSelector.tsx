import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useI18n } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import BR from 'country-flag-icons/react/3x2/BR'
import US from 'country-flag-icons/react/3x2/US'
import AR from 'country-flag-icons/react/3x2/AR'

// Mapa de locale -> componente de bandeira
const flagComponents: Record<string, React.ComponentType<{ className?: string }>> = {
  pt: BR,
  en: US,
  es: AR,
}

export function LanguageSelector({ className }: { className?: string }) {
  const { locale, setLocale, locales } = useI18n()
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const currentLocale = locales.find((l) => l.code === locale)
  const CurrentFlag = flagComponents[locale]

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn("flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm transition-colors hover:bg-black/5", className)}
        aria-label="Select language"
      >
        {CurrentFlag && <CurrentFlag className="h-4 w-5 rounded-sm shadow-sm" />}
        <span className="hidden font-medium opacity-90 sm:inline">{currentLocale?.code.toUpperCase()}</span>
        <svg
          className={`h-3.5 w-3.5 opacity-70 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full z-50 mt-2 min-w-[140px] overflow-hidden rounded-xl border border-white/10 bg-cyan-900/95 shadow-xl backdrop-blur-xl"
          >
            {locales.map((l) => {
              const FlagComponent = flagComponents[l.code]
              return (
                <button
                  key={l.code}
                  onClick={() => {
                    setLocale(l.code)
                    setIsOpen(false)
                  }}
                  className={`flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm transition-colors hover:bg-white/10 ${locale === l.code ? 'bg-white/5 text-cyan-400' : 'text-white/90'
                    }`}
                >
                  {FlagComponent && <FlagComponent className="h-4 w-5 rounded-sm shadow-sm" />}
                  <span className="font-medium">{l.name}</span>
                  {locale === l.code && (
                    <svg className="ml-auto h-4 w-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
