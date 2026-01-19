import { GoogleGenerativeAI } from '@google/generative-ai'
import type { Locale } from './i18n'

// ============================================
// API Keys Configuration
// ============================================

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY || ''

// NVIDIA fallback uses Cloudflare Worker proxy (API key stored there)
export function hasNvidiaFallback(): boolean {
  return true // Always available via proxy
}

// ============================================
// Google AI Client
// ============================================

export const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY)

// ============================================
// Model Configuration
// ============================================

export const GOOGLE_MODEL = 'gemini-2.0-flash'
export const NVIDIA_MODEL = 'nvidia/llama-3.3-nemotron-super-49b-v1.5'

// Use Cloudflare Worker proxy to bypass CORS
export const NVIDIA_PROXY_URL = 'https://click-nautico-ai.gabrielmaialva33.workers.dev'

// ============================================
// System Prompts (Multi-language)
// ============================================

const CLICK_NAUTICO_INFO = `
Click Náutico Information:
- Kite surf school since 2018
- Located at Vila Galé Resort, Touros-RN, Brazil
- IKO certified instructors
- Premium equipment from Duotone and North

Services:
- Kite lessons (beginner to advanced)
- Packages: Baptism (2h R$350), Basic (6h R$900), Complete (10h R$1,600)
- Equipment rental
- Boat tours to Maracajaú natural pools
- Buggy tours through the dunes

Conditions:
- Best season: August to January (strong, consistent winds)
- Average wind: 15-25 knots
- Warm water year-round

For bookings and specific questions, direct to WhatsApp.
`

export const SYSTEM_PROMPTS: Record<Locale, string> = {
  pt: `Você é a IA da Click Náutico, uma escola de kite surf em Vila Galé Touros, RN.

Personalidade:
- Casual e descontraída, fala como brasileiro
- Usa gírias: "mano", "massa", "dahora", "beleza", "show"
- Tom animado mas sem exageros
- Animada com kite surf e o litoral potiguar
- Simpática e prestativa

${CLICK_NAUTICO_INFO}

Responda SEMPRE em português brasileiro, de forma breve, útil e animada!`,

  en: `You are Click Náutico's AI assistant, a kite surf school in Vila Galé Touros, RN, Brazil.

Personality:
- Friendly and laid-back, like a beach instructor
- Uses casual expressions: "awesome", "cool", "no worries"
- Enthusiastic but not over the top
- Excited about kite surfing and the Brazilian coast
- Helpful and welcoming

${CLICK_NAUTICO_INFO}

ALWAYS respond in English, keep it brief, helpful, and enthusiastic!`,

  es: `Eres la IA de Click Náutico, una escuela de kite surf en Vila Galé Touros, RN, Brasil.

Personalidad:
- Casual y relajada, como un instructor de playa
- Usa expresiones coloquiales: "genial", "qué bueno", "tranqui"
- Tono animado pero sin exagerar
- Emocionada con el kite surf y la costa brasileña
- Simpática y servicial

${CLICK_NAUTICO_INFO}

¡Responde SIEMPRE en español, de forma breve, útil y animada!`,
}

// ============================================
// NVIDIA Fallback API
// ============================================

export interface NvidiaMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export async function* streamNvidiaChat(
  messages: NvidiaMessage[],
  locale: Locale
): AsyncGenerator<string> {
  const systemMessage: NvidiaMessage = {
    role: 'system',
    content: SYSTEM_PROMPTS[locale],
  }

  // Use Cloudflare Worker proxy (handles CORS + API key)
  const response = await fetch(NVIDIA_PROXY_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: NVIDIA_MODEL,
      messages: [systemMessage, ...messages],
      temperature: 0.7,
      top_p: 0.95,
      max_tokens: 1000,
      stream: true,
    }),
  })

  if (!response.ok) {
    throw new Error(`NVIDIA API error: ${response.status}`)
  }

  const reader = response.body?.getReader()
  if (!reader) throw new Error('No response body')

  const decoder = new TextDecoder()
  let buffer = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break

    buffer += decoder.decode(value, { stream: true })
    const lines = buffer.split('\n')
    buffer = lines.pop() || ''

    for (const line of lines) {
      if (line.startsWith('data: ')) {
        const data = line.slice(6)
        if (data === '[DONE]') return

        try {
          const json = JSON.parse(data)
          const content = json.choices?.[0]?.delta?.content
          if (content) {
            yield content
          }
        } catch {
          // Skip invalid JSON
        }
      }
    }
  }
}

// ============================================
// Provider Type
// ============================================

export type AIProvider = 'google' | 'nvidia'

export function getAvailableProvider(): AIProvider {
  if (GOOGLE_API_KEY) return 'google'
  return 'nvidia'
}
