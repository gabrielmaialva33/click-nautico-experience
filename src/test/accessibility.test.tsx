import { describe, it, expect, vi } from 'vitest'
import { configureAxe, toHaveNoViolations } from 'jest-axe'
import { render } from '@testing-library/react'
import { LazyMotion, domAnimation } from 'framer-motion'
import { ChatWidget } from '@/components/chat/ChatWidget'
import { ChatInput } from '@/components/chat/ChatInput'

// Extend expect com matchers de acessibilidade
expect.extend(toHaveNoViolations)

// Configure axe com regras customizadas
const axe = configureAxe({
  rules: {
    // Desabilita regra de região pois é um widget flutuante
    region: { enabled: false },
  },
})

// Mock i18n
vi.mock('@/lib/i18n', () => ({
  useI18n: () => ({
    t: {
      chat: {
        tooltip: 'Fale com a gente!',
        greeting: 'Olá!',
        greetingDesc: 'Como posso ajudar?',
        placeholder: 'Manda tua pergunta...',
        send: 'Enviar mensagem',
        close: 'Fechar chat',
        quickReplies: {
          kite: 'Quero aprender kite!',
          prices: 'Preços das aulas',
          tours: 'Passeios disponíveis',
          availability: 'Horários',
        },
      },
    },
    locale: 'pt-BR',
    setLocale: vi.fn(),
  }),
}))

// Wrapper com providers
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <LazyMotion features={domAnimation} strict>
    {children}
  </LazyMotion>
)

describe('Acessibilidade', () => {
  describe('ChatWidget', () => {
    it('não tem violações de acessibilidade quando fechado', async () => {
      const { container } = render(
        <TestWrapper>
          <ChatWidget />
        </TestWrapper>
      )

      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })

  describe('ChatInput', () => {
    it('não tem violações de acessibilidade', async () => {
      const { container } = render(
        <TestWrapper>
          <ChatInput onSend={vi.fn()} isLoading={false} />
        </TestWrapper>
      )

      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('não tem violações quando loading', async () => {
      const { container } = render(
        <TestWrapper>
          <ChatInput onSend={vi.fn()} isLoading={true} />
        </TestWrapper>
      )

      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})

describe('Padrões de Acessibilidade', () => {
  it('todos os botões interativos têm aria-label', () => {
    const { container } = render(
      <TestWrapper>
        <ChatWidget />
      </TestWrapper>
    )

    const buttons = container.querySelectorAll('button')
    buttons.forEach((button) => {
      const hasAriaLabel = button.hasAttribute('aria-label')
      const hasText = button.textContent?.trim()
      const hasAriaLabelledBy = button.hasAttribute('aria-labelledby')

      expect(hasAriaLabel || hasText || hasAriaLabelledBy).toBe(true)
    })
  })

  it('formulário de input tem estrutura semântica', () => {
    const { container } = render(
      <TestWrapper>
        <ChatInput onSend={vi.fn()} isLoading={false} />
      </TestWrapper>
    )

    const textarea = container.querySelector('textarea')
    expect(textarea).toBeInTheDocument()
    expect(textarea).toHaveAttribute('placeholder')
  })

  it('contraste de cores é suficiente', async () => {
    // Este teste verifica se não há violações de contraste
    const { container } = render(
      <TestWrapper>
        <ChatInput onSend={vi.fn()} isLoading={false} />
      </TestWrapper>
    )

    const axeWithColor = configureAxe({
      rules: {
        'color-contrast': { enabled: true },
        region: { enabled: false },
      },
    })

    const results = await axeWithColor(container)
    // Filtra apenas violações de contraste
    const contrastViolations = results.violations.filter(
      (v) => v.id === 'color-contrast'
    )
    expect(contrastViolations).toHaveLength(0)
  })
})
