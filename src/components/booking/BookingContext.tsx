import { createContext, useContext, useState, type ReactNode } from 'react'

type BookingType = 'kite' | 'tour' | null
type BookingData = {
  type: BookingType
  package?: string
}

interface BookingContextType {
  isOpen: boolean
  initialData: BookingData
  openBooking: (type?: BookingType, packageName?: string) => void
  closeBooking: () => void
}

const BookingContext = createContext<BookingContextType | null>(null)

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [initialData, setInitialData] = useState<BookingData>({ type: null })

  const openBooking = (type: BookingType = null, packageName?: string) => {
    setInitialData({ type, package: packageName })
    setIsOpen(true)
  }

  const closeBooking = () => {
    setIsOpen(false)
    setInitialData({ type: null })
  }

  return (
    <BookingContext.Provider value={{ isOpen, initialData, openBooking, closeBooking }}>
      {children}
    </BookingContext.Provider>
  )
}

export function useBooking() {
  const context = useContext(BookingContext)
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider')
  }
  return context
}
