import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import type { Locale, Translations } from './types'
import { pt } from './pt'
import { en } from './en'
import { es } from './es'

const translations: Record<Locale, Translations> = { pt, en, es }

interface I18nContextType {
  locale: Locale
  t: Translations
  translate: (key: string) => string
  setLocale: (locale: Locale) => void
  locales: { code: Locale; name: string; flag: string }[]
}

const I18nContext = createContext<I18nContextType | null>(null)

const STORAGE_KEY = 'click-nautico-locale'

const locales: { code: Locale; name: string; flag: string }[] = [
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
]

function detectBrowserLocale(): Locale {
  const browserLang = navigator.language.split('-')[0]
  if (browserLang === 'pt') return 'pt'
  if (browserLang === 'es') return 'es'
  if (browserLang === 'en') return 'en'
  return 'pt' // default
}

function getInitialLocale(): Locale {
  // 1. Check localStorage
  const stored = localStorage.getItem(STORAGE_KEY) as Locale | null
  if (stored && ['pt', 'en', 'es'].includes(stored)) {
    return stored
  }

  // 2. Check URL param
  const urlParams = new URLSearchParams(window.location.search)
  const urlLocale = urlParams.get('lang') as Locale | null
  if (urlLocale && ['pt', 'en', 'es'].includes(urlLocale)) {
    return urlLocale
  }

  // 3. Detect from browser
  return detectBrowserLocale()
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('pt')
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    const initialLocale = getInitialLocale()
    setLocaleState(initialLocale)
    setIsInitialized(true)
  }, [])

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem(STORAGE_KEY, newLocale)

    // Update URL without reload
    const url = new URL(window.location.href)
    url.searchParams.set('lang', newLocale)
    window.history.replaceState({}, '', url.toString())

    // Update HTML lang attribute
    document.documentElement.lang = newLocale === 'pt' ? 'pt-BR' : newLocale
  }, [])

  const t = translations[locale]

  // Helper to access nested keys like 'kite.step1Title'
  const translate = useCallback((key: string): string => {
    const keys = key.split('.')
    let result: unknown = t
    for (const k of keys) {
      result = (result as Record<string, unknown>)?.[k]
    }
    return (result as string) || key
  }, [t])

  if (!isInitialized) {
    return null // Prevent flash of wrong language
  }

  return (
    <I18nContext.Provider value={{ locale, t, translate, setLocale, locales }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return context
}
