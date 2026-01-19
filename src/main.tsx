import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LazyMotion, domAnimation } from 'framer-motion'
import { I18nProvider } from './lib/i18n'
import App from './App'
import './styles/globals.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LazyMotion features={domAnimation} strict>
      <I18nProvider>
        <App />
      </I18nProvider>
    </LazyMotion>
  </StrictMode>
)
