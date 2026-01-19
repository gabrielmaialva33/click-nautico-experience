import { Hero } from './components/sections/Hero'
import { KiteSchool } from './components/sections/KiteSchool'
import { Tours } from './components/sections/Tours'
import { Footer } from './components/sections/Footer'
import { FloatingWhatsApp } from './components/ui/FloatingWhatsApp'
import { Navbar } from './components/ui/Navbar'

export default function App() {
  return (
    <div className="min-h-screen bg-sand-50">
      <Navbar />
      <main>
        <Hero />
        <KiteSchool />
        <Tours />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  )
}
