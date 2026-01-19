import { describe, it, expect, vi } from 'vitest'
import { screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { render } from '@/test/utils'
import { ChatWidget } from './ChatWidget'

// Mock i18n
vi.mock('@/lib/i18n', () => ({
  useI18n: () => ({
    t: {
      chat: {
        tooltip: 'Fale com a gente!',
        greeting: 'Olá!',
        greetingDesc: 'Como posso ajudar?',
        placeholder: 'Digite sua mensagem...',
        online: 'Online agora',
        clearChat: 'Limpar conversa',
        title: 'Chat com Click AI',
        close: 'Fechar chat',
        send: 'Enviar mensagem',
        sending: 'Enviando...',
        inputLabel: 'Digite sua mensagem',
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

describe('ChatWidget', () => {
  it('renderiza o botão de toggle corretamente', () => {
    render(<ChatWidget />)

    const button = screen.getByRole('button', { name: /chat ai/i })
    expect(button).toBeInTheDocument()
  })

  it('exibe badge "AI" quando chat está fechado', () => {
    render(<ChatWidget />)

    expect(screen.getByText('AI')).toBeInTheDocument()
  })

  it('abre o chat ao clicar no botão', async () => {
    const user = userEvent.setup()
    render(<ChatWidget />)

    const button = screen.getByRole('button', { name: /chat ai/i })
    await user.click(button)

    // Chat container deve estar visível
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('fecha o chat ao clicar no X', async () => {
    const user = userEvent.setup()
    render(<ChatWidget />)

    // Abre o chat
    const toggleButton = screen.getByRole('button', { name: /chat ai/i })
    await user.click(toggleButton)

    // Clica no botão de fechar dentro do container
    const closeButton = screen.getByRole('button', { name: /fechar/i })
    await user.click(closeButton)

    // Aguarda animação de saída terminar
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    }, { timeout: 1000 })
  })

  it('mantém foco acessível após abrir', async () => {
    const user = userEvent.setup()
    render(<ChatWidget />)

    const toggleButton = screen.getByRole('button', { name: /chat ai/i })
    await user.click(toggleButton)

    // Deve ter elementos focáveis dentro do chat
    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()
  })

  it('suporta navegação por teclado', async () => {
    const user = userEvent.setup()
    render(<ChatWidget />)

    // Tab deve focar no botão
    await user.tab()
    expect(screen.getByRole('button', { name: /chat ai/i })).toHaveFocus()

    // Enter deve abrir o chat
    await user.keyboard('{Enter}')
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })
})
