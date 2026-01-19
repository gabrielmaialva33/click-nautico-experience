import { useEffect } from 'react'
import { Hero } from './components/sections/Hero'
import { KiteSchool } from './components/sections/KiteSchool'
import { Tours } from './components/sections/Tours'
import { Footer } from './components/sections/Footer'
import { FloatingWhatsApp } from './components/ui/FloatingWhatsApp'
import { Navbar } from './components/ui/Navbar'
import { ChatWidget } from './components/chat'
import { BookingProvider } from './components/booking/BookingContext'
import { BookingModal } from './components/booking/BookingModal'
import { useVisitorStore } from './store/visitorStore'

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
      { threshold: 0.5 }
    )

    const sections = document.querySelectorAll('section[id]')
    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [updateContext])

  return (
    <BookingProvider>
      <div className="min-h-screen bg-gray-900">
        <Navbar />
        <main>
          <Hero />
          <KiteSchool />
          <Tours />
        </main>
        <Footer />
        <FloatingWhatsApp />
        <ChatWidget />
        <BookingModal />
      </div>
    </BookingProvider>
  )
}
