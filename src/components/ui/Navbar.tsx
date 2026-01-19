import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useI18n } from '@/lib/i18n'
import { INSTAGRAM_LINK, WHATSAPP_LINK } from '@/constants'
import { LanguageSelector } from './LanguageSelector'

export function Navbar() {
  const { t } = useI18n()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { label: t.nav.home, href: '#home' },
    { label: t.nav.kiteSchool, href: '#kite' },
    { label: t.nav.tours, href: '#tours' },
    { label: t.nav.contact, href: '#contact' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled
          ? 'bg-sand-950/80 backdrop-blur-xl shadow-2xl shadow-black/20 border-b border-white/10'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2">
            <span
              className={cn(
                'text-xl md:text-2xl font-display font-bold tracking-tight transition-colors',
                isScrolled ? 'text-white' : 'text-white'
              )}
            >
              CLICK{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-ocean-300 to-cyan-300">
                NÁUTICO
              </span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-ocean-400',
                  isScrolled ? 'text-white/80 hover:text-ocean-300' : 'text-white/90'
                )}
              >
                {item.label}
              </a>
            ))}
            <div className="rounded-full bg-white/10 backdrop-blur-sm border border-white/10">
              <LanguageSelector className="text-white hover:bg-white/10" />
            </div>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-ocean-500 to-ocean-600 hover:from-ocean-400 hover:to-ocean-500 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-ocean-500/30"
            >
              {t.nav.bookClass}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span
                className={cn(
                  'w-full h-0.5 rounded-full transition-all transform origin-center bg-white',
                  isMobileMenuOpen && 'rotate-45 translate-y-2'
                )}
              />
              <span
                className={cn(
                  'w-full h-0.5 rounded-full transition-all bg-white',
                  isMobileMenuOpen && 'opacity-0'
                )}
              />
              <span
                className={cn(
                  'w-full h-0.5 rounded-full transition-all transform origin-center bg-white',
                  isMobileMenuOpen && '-rotate-45 -translate-y-2'
                )}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-sand-950/95 backdrop-blur-xl border-t border-white/10"
          >
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-white/80 hover:text-ocean-400 font-medium py-2"
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-2 border-t border-white/10">
                <div className="inline-block rounded-full bg-white/10 border border-white/10">
                  <LanguageSelector className="text-white" />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <a
                  href={INSTAGRAM_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center bg-white/10 backdrop-blur-sm border border-white/10 text-white px-4 py-3 rounded-xl font-semibold hover:bg-white/20 transition-colors"
                >
                  Instagram
                </a>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center bg-gradient-to-r from-ocean-500 to-ocean-600 text-white px-4 py-3 rounded-xl font-semibold shadow-lg shadow-ocean-500/30"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
