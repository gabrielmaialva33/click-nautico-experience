import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatWhatsAppLink(number: string, message?: string): string {
  const baseUrl = 'https://wa.me/'
  const encodedMessage = message ? `?text=${encodeURIComponent(message)}` : ''
  return `${baseUrl}${number}${encodedMessage}`
}

export const WHATSAPP_MESSAGES = {
  default: 'Olá! Gostaria de mais informações sobre as aulas e passeios.',
  kite: 'Olá! Tenho interesse nas aulas de Kite Surf. Poderia me enviar mais informações?',
  tour: 'Olá! Gostaria de agendar um passeio. Quais datas estão disponíveis?',
  rental: 'Olá! Gostaria de alugar equipamento de kite. Qual a disponibilidade?',
} as const

// Helper to safely resolve nested translation keys
// e.g. resolveTranslation(t, 'kite.step1Title')
export function resolveTranslation(obj: any, path: string): string {
  if (!path) return ''
  const value = path.split('.').reduce((prev, curr) => prev?.[curr], obj)
  return typeof value === 'string' ? value : path
}
