import { Hero } from './components/sections/Hero'
import { KiteSchool } from './components/sections/KiteSchool'
import { Tours } from './components/sections/Tours'
import { Footer } from './components/sections/Footer'
import { FloatingWhatsApp } from './components/ui/FloatingWhatsApp'
import { Navbar } from './components/ui/Navbar'
import { ChatWidget } from './components/chat'
import { BookingProvider } from './components/booking/BookingContext'
import { BookingModal } from './components/booking/BookingModal'

export default function App() {
  return (
    <BookingProvider>
      <div className="min-h-screen bg-sand-50">
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
