import { describe, it, expect, vi } from 'vitest'
import { screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { render } from '@/test/utils'
import { ChatInput } from './ChatInput'

// Mock i18n
vi.mock('@/lib/i18n', () => ({
  useI18n: () => ({
    t: {
      chat: {
        placeholder: 'Manda tua pergunta...',
        send: 'Enviar mensagem',
        sending: 'Enviando...',
        inputLabel: 'Digite sua mensagem',
      },
    },
  }),
}))

describe('ChatInput', () => {
  const mockOnSend = vi.fn()

  beforeEach(() => {
    mockOnSend.mockClear()
  })

  it('renderiza textarea com placeholder', () => {
    render(<ChatInput onSend={mockOnSend} isLoading={false} />)

    const textarea = screen.getByRole('textbox')
    expect(textarea).toBeInTheDocument()
    expect(textarea).toHaveAttribute('placeholder', 'Manda tua pergunta...')
  })

  it('chama onSend ao submeter mensagem', async () => {
    const user = userEvent.setup()
    render(<ChatInput onSend={mockOnSend} isLoading={false} />)

    const textarea = screen.getByRole('textbox')
    await user.type(textarea, 'Olá!')
    await user.keyboard('{Enter}')

    expect(mockOnSend).toHaveBeenCalledWith('Olá!')
  })

  it('não submete mensagem vazia', async () => {
    const user = userEvent.setup()
    render(<ChatInput onSend={mockOnSend} isLoading={false} />)

    const textarea = screen.getByRole('textbox')
    await user.click(textarea)
    await user.keyboard('{Enter}')

    expect(mockOnSend).not.toHaveBeenCalled()
  })

  it('desabilita input quando isLoading é true', () => {
    render(<ChatInput onSend={mockOnSend} isLoading={true} />)

    const textarea = screen.getByRole('textbox')
    expect(textarea).toBeDisabled()
  })

  it('limpa input após enviar', async () => {
    const user = userEvent.setup()
    render(<ChatInput onSend={mockOnSend} isLoading={false} />)

    const textarea = screen.getByRole('textbox')
    await user.type(textarea, 'Teste')
    await user.keyboard('{Enter}')

    expect(textarea).toHaveValue('')
  })

  it('permite quebra de linha com Shift+Enter', async () => {
    const user = userEvent.setup()
    render(<ChatInput onSend={mockOnSend} isLoading={false} />)

    const textarea = screen.getByRole('textbox')
    await user.type(textarea, 'Linha 1{Shift>}{Enter}{/Shift}Linha 2')

    expect(textarea).toHaveValue('Linha 1\nLinha 2')
    expect(mockOnSend).not.toHaveBeenCalled()
  })

  it('botão de enviar fica visível quando há texto', async () => {
    const user = userEvent.setup()
    render(<ChatInput onSend={mockOnSend} isLoading={false} />)

    const textarea = screen.getByRole('textbox')
    await user.type(textarea, 'Teste')

    const button = screen.getByRole('button', { name: /enviar/i })
    expect(button).not.toBeDisabled()
  })

  it('mostra spinner quando isLoading é true', () => {
    render(<ChatInput onSend={mockOnSend} isLoading={true} />)

    // Procura pelo elemento de loading (spinner com role="status")
    const spinner = screen.getByRole('status', { name: /carregando/i })
    expect(spinner).toBeInTheDocument()
  })

  it('textarea é acessível com label', () => {
    render(<ChatInput onSend={mockOnSend} isLoading={false} />)

    const textarea = screen.getByRole('textbox')
    expect(textarea).toHaveAccessibleName()
  })
})
