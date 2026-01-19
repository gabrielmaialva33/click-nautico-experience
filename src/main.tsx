import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LazyMotion } from 'framer-motion'
import { I18nProvider } from './lib/i18n'
import { loadFeatures } from './lib/motion'
import App from './App'
import './styles/globals.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LazyMotion features={loadFeatures} strict>
      <I18nProvider>
        <App />
      </I18nProvider>
    </LazyMotion>
  </StrictMode>
)
