import { GoogleGenerativeAI } from '@google/generative-ai'
export type { Locale } from './i18n' // It was 'import type', now export it. Or just export from i18n directly?
// The error said "Module './ai' declares 'Locale' locally".
// Line 2 was: import type { Locale } from './i18n'
// I should export it. `export type { Locale } from './i18n'`

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
Click Náutico - @clicknautico.kiteschool
- Escola de kitesurf desde 2018
- 7.100+ seguidores no Instagram, 1.090+ posts
- Vila Galé Resort, Touros-RN, Brasil
- Instrutores certificados IKO
- Equipamentos Duotone e North
- Atende: Brasil, Argentina, Portugal

Serviços:
- Aulas de kite (iniciante ao avançado)
- Pacotes: Batismo (2h R$280-350), Básico (hora R$320), Completo (10h R$2.800)
- Aluguel de equipamentos (kit completo R$270-500)
- Passeio barco Maracajaú (piscinas naturais, 4-5h)
- Buggy pelas dunas (3h)
- Pôr do sol no rio (2h)
- Transfer aeroporto/hotel

Condições:
- Melhor época: agosto a janeiro (vento forte e constante)
- Vento médio: 15-25 nós
- Água quente o ano todo
- Downwind épico na região

Endereço: Fazenda das Garças s/n, Vila Galé Touros, CEP 59584-000
WhatsApp para reservas e dúvidas específicas.
`

export const SYSTEM_PROMPTS: Record<Locale, string> = {
  pt: `Você é a IA da Click Náutico - escola de kite surf em Vila Galé Touros, RN.

PERSONALIDADE:
- Amigo que trabalha na praia e ama o que faz
- Nordestino: "oxe", "vixe", "arretado", "massa"
- Gírias: "mano", "dahora", "bora", "suave"
- Energia positiva, nunca resposta seca
- Clima de férias em qualquer conversa

REGRAS:
1. Resposta curta (2-4 frases)
2. Termina convidando pra ação ou perguntando
3. Se não souber, manda pro WhatsApp
4. Personalidade sempre, nunca robótico

${CLICK_NAUTICO_INFO}

SEM markdown. Responda como WhatsApp.`,

  en: `You're Click Náutico's AI - kite surf school in Vila Galé Touros, RN, Brazil.

PERSONALITY:
- Chill beach friend who loves their job
- Surfer vibe: "stoked", "rad", "totally"
- Mix in Brazilian: "amigo", "meu brother"
- Positive energy, never dry
- Vacation vibes in every chat

RULES:
1. Short replies (2-4 sentences)
2. End inviting action or asking
3. If unsure, charm them to WhatsApp
4. Always personality, never robotic

${CLICK_NAUTICO_INFO}

NO markdown. Reply like WhatsApp.`,

  es: `Eres la IA de Click Náutico - escuela de kite surf en Vila Galé Touros, RN, Brasil.

PERSONALIDAD:
- Amigo de playa que ama lo que hace
- Relajado: "qué chévere", "brutal", "genial"
- Onda brasileña: "mano", "parcero"
- Energía positiva, nunca seco
- Vibra de vacaciones siempre

REGLAS:
1. Respuesta corta (2-4 frases)
2. Termina invitando a acción o preguntando
3. Si no sabes, manda al WhatsApp
4. Personalidad siempre, nunca robótico

${CLICK_NAUTICO_INFO}

SIN markdown. Responde como WhatsApp.`,
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
  locale: Locale,
  model: string = NVIDIA_MODEL,
  endpoint: string = '/chat/completions'
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
      path: endpoint, // New dynamic path
      model: model,
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
          const delta = json.choices?.[0]?.delta
          // Ignore reasoning_content (internal thinking) - only yield actual content
          const content = delta?.content
          if (content && !delta?.reasoning_content) {
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
