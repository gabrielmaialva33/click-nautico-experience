import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useBooking } from './BookingContext'
import { useI18n } from '@/lib/i18n'
import { WHATSAPP_LINK } from '@/constants'

const initialFormState = {
  type: '',
  package: '',
  date: '',
  name: '',
  notes: ''
}

export function BookingModal() {
  const { isOpen, closeBooking, initialData } = useBooking()
  const { t } = useI18n()

  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState(initialFormState)

  // Reset form and initialize when opening
  useEffect(() => {
    if (isOpen) {
      setStep(initialData.type ? 2 : 1)
      setFormData({
        ...initialFormState,
        type: initialData.type || '',
        package: initialData.package || ''
      })
    } else {
      // Reset when closing
      setStep(1)
      setFormData(initialFormState)
    }
  }, [isOpen, initialData])

  // ESC key handler
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeBooking()
    }
  }, [closeBooking])

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, handleKeyDown])

  if (!isOpen) return null

  const handleNext = () => setStep(prev => prev + 1)
  const handleBack = () => setStep(prev => prev - 1)

  // Click outside handler
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeBooking()
    }
  }

  const handleSend = () => {
    const text = t.booking.whatsappMessage
      .replace('{type}', formData.type === 'kite' ? t.booking.type.kite : t.booking.type.tour)
      .replace('{package}', formData.package || '-')
      .replace('{date}', formData.date)
      .replace('{name}', formData.name)
      .replace('{notes}', formData.notes || '-')

    const url = `${WHATSAPP_LINK}&text=${encodeURIComponent(text)}`
    window.open(url, '_blank')
    closeBooking()
  }

  const renderStep1 = () => (
    <div className="grid grid-cols-2 gap-4">
      <button
        onClick={() => {
          setFormData({ ...formData, type: 'kite' })
          handleNext()
        }}
        className="flex flex-col items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-cyan-500/20"
      >
        <span className="text-4xl">🪁</span>
        <span className="font-semibold text-white">{t.booking.type.kite}</span>
      </button>
      <button
        onClick={() => {
          setFormData({ ...formData, type: 'tour' })
          handleNext()
        }}
        className="flex flex-col items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-cyan-500/20"
      >
        <span className="text-4xl">🌴</span>
        <span className="font-semibold text-white">{t.booking.type.tour}</span>
      </button>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-4">
      <div>
        <label htmlFor="package" className="mb-1 block text-sm text-gray-300">{t.booking.labels.package}</label>
        <input
          id="package"
          type="text"
          value={formData.package}
          onChange={(e) => setFormData({ ...formData, package: e.target.value })}
          placeholder={t.booking.placeholders.package}
          className="w-full rounded-lg bg-gray-900 px-4 py-2 !text-white placeholder:!text-gray-400 outline-none focus:ring-2 focus:ring-cyan-500"
        />
      </div>
      <div>
        <label htmlFor="date" className="mb-1 block text-sm text-gray-300">{t.booking.labels.date}</label>
        <input
          id="date"
          type="date"
          style={{ colorScheme: 'dark' }}
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="w-full rounded-lg bg-gray-900 px-4 py-2 !text-white outline-none focus:ring-2 focus:ring-cyan-500"
        />
      </div>
      <div className="flex justify-between pt-4">
        <button onClick={handleBack} className="text-gray-400 hover:text-white">
          ← {t.booking.labels.back}
        </button>
        <button
          onClick={handleNext}
          disabled={!formData.date}
          className="rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-2 font-semibold text-white disabled:opacity-50"
        >
          {t.booking.labels.next} →
        </button>
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-4">
      <div>
        <label htmlFor="name" className="mb-1 block text-sm text-gray-300">{t.booking.labels.name}</label>
        <input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder={t.booking.placeholders.name}
          className="w-full rounded-lg bg-gray-900 px-4 py-2 !text-white placeholder:!text-gray-400 outline-none focus:ring-2 focus:ring-cyan-500"
        />
      </div>
      <div>
        <label htmlFor="notes" className="mb-1 block text-sm text-gray-300">{t.booking.labels.notes}</label>
        <textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          placeholder={t.booking.placeholders.notes}
          className="w-full rounded-lg bg-gray-900 px-4 py-2 !text-white placeholder:!text-gray-400 outline-none focus:ring-2 focus:ring-cyan-500"
          rows={3}
        />
      </div>
      <div className="flex justify-between pt-4">
        <button onClick={handleBack} className="text-gray-400 hover:text-white">
          ← {t.booking.labels.back}
        </button>
        <button
          onClick={handleSend}
          disabled={!formData.name}
          className="rounded-lg bg-green-500 px-6 py-2 font-bold text-white shadow-lg shadow-green-500/20 hover:bg-green-600 disabled:opacity-50"
        >
          {t.booking.labels.send} 🚀
        </button>
      </div>
    </div>
  )

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-gray-900 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-6 py-4">
          <h3 id="modal-title" className="text-lg font-bold text-white">
            {step === 1 ? t.booking.step1 : step === 2 ? t.booking.step2 : t.booking.step3}
          </h3>
          <button onClick={closeBooking} className="text-white/50 hover:text-white" aria-label="Close modal">✕</button>
        </div>

        <div className="p-6">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
        </div>

        {/* Progress Bar */}
        <div className="h-1 w-full bg-white/5">
          <motion.div
            className="h-full bg-cyan-500"
            animate={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </motion.div>
    </div>
  )
}
