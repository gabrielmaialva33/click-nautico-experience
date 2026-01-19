import { useEffect, lazy, Suspense } from 'react'
import { Hero } from './components/sections/Hero'
import { Navbar } from './components/ui/Navbar'
import { BookingProvider } from './components/booking/BookingContext'
import { useVisitorStore } from './store/visitorStore'

// Lazy load components below the fold
const KiteSchool = lazy(() => import('./components/sections/KiteSchool').then(m => ({ default: m.KiteSchool })))
const Tours = lazy(() => import('./components/sections/Tours').then(m => ({ default: m.Tours })))
const Footer = lazy(() => import('./components/sections/Footer').then(m => ({ default: m.Footer })))
const FloatingWhatsApp = lazy(() => import('./components/ui/FloatingWhatsApp').then(m => ({ default: m.FloatingWhatsApp })))
const ChatWidget = lazy(() => import('./components/chat').then(m => ({ default: m.ChatWidget })))
const BookingModal = lazy(() => import('./components/booking/BookingModal').then(m => ({ default: m.BookingModal })))

export default function App() {
  const { updateContext } = useVisitorStore()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            updateContext({ lastSection: entry.target.id })
          }
        })
      },
      { threshold: 0.1 }
    )

    const sections = document.querySelectorAll('section[id]')
    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [updateContext])

  return (
    <BookingProvider>
      <div className="min-h-screen bg-sand-950">
        <Navbar />
        <main>
          <Hero />
          <Suspense fallback={<div className="min-h-screen bg-sand-950" />}>
            <KiteSchool />
            <Tours />
          </Suspense>
        </main>
        <Suspense fallback={null}>
          <Footer />
          <FloatingWhatsApp />
          <ChatWidget />
          <BookingModal />
        </Suspense>
      </div>
    </BookingProvider>
  )
}
