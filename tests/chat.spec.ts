import { test, expect } from '@playwright/test'

test.describe('Chat Widget', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('exibe botão do chat na página', async ({ page }) => {
    const chatButton = page.getByRole('button', { name: /chat ai/i })
    await expect(chatButton).toBeVisible()
  })

  test('abre o chat ao clicar no botão', async ({ page }) => {
    const chatButton = page.getByRole('button', { name: /chat ai/i })
    await chatButton.click()

    const chatDialog = page.getByRole('dialog')
    await expect(chatDialog).toBeVisible()
  })

  test('fecha o chat ao clicar no X', async ({ page }) => {
    // Abre o chat
    await page.getByRole('button', { name: /chat ai/i }).click()
    await expect(page.getByRole('dialog')).toBeVisible()

    // Fecha o chat
    await page.getByRole('button', { name: /fechar/i }).click()
    await expect(page.getByRole('dialog')).not.toBeVisible()
  })

  test('exibe quick replies quando chat está vazio', async ({ page }) => {
    await page.getByRole('button', { name: /chat ai/i }).click()

    // Verifica quick replies
    await expect(page.getByText('Aulas de Kite')).toBeVisible()
    await expect(page.getByText('Preços')).toBeVisible()
    await expect(page.getByText('Passeios')).toBeVisible()
    await expect(page.getByText('Disponibilidade')).toBeVisible()
  })

  test('permite enviar mensagem pelo input', async ({ page }) => {
    await page.getByRole('button', { name: /chat ai/i }).click()

    const input = page.getByRole('textbox')
    await input.fill('Olá, quero saber sobre aulas de kite')
    await input.press('Enter')

    // Verifica se a mensagem do usuário aparece
    await expect(page.getByText('Olá, quero saber sobre aulas de kite')).toBeVisible()
  })

  test('clica em quick reply e envia mensagem', async ({ page }) => {
    await page.getByRole('button', { name: /chat ai/i }).click()

    // Clica no quick reply
    await page.getByText('Aulas de Kite').click()

    // Verifica se aparece mensagem do usuário
    await expect(page.locator('[class*="bg-ocean"]').first()).toBeVisible()
  })

  test('bloqueia scroll do body quando chat está aberto no mobile', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Teste apenas para mobile')

    await page.getByRole('button', { name: /chat ai/i }).click()

    // Verifica se o body tem overflow hidden
    const bodyOverflow = await page.evaluate(() => {
      return window.getComputedStyle(document.body).overflow
    })
    expect(bodyOverflow).toBe('hidden')
  })
})

test.describe('Chat Acessibilidade', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('botão do chat tem aria-label', async ({ page }) => {
    const chatButton = page.getByRole('button', { name: /chat ai/i })
    await expect(chatButton).toHaveAttribute('aria-label', 'Chat AI')
  })

  test('chat dialog tem role="dialog" e aria-modal', async ({ page }) => {
    await page.getByRole('button', { name: /chat ai/i }).click()

    const dialog = page.getByRole('dialog')
    await expect(dialog).toHaveAttribute('aria-modal', 'true')
    await expect(dialog).toHaveAttribute('aria-label')
  })

  test('input tem aria-label e aria-describedby', async ({ page }) => {
    await page.getByRole('button', { name: /chat ai/i }).click()

    const input = page.getByRole('textbox')
    await expect(input).toHaveAttribute('aria-label')
    await expect(input).toHaveAttribute('aria-describedby')
  })

  test('botão de fechar tem aria-label', async ({ page }) => {
    await page.getByRole('button', { name: /chat ai/i }).click()

    const closeButton = page.getByRole('button', { name: /fechar/i })
    await expect(closeButton).toHaveAttribute('aria-label')
  })

  test('navegação por teclado funciona', async ({ page }) => {
    // Tab para o botão do chat
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab') // Pode precisar de mais tabs dependendo da página

    // Procura o botão de chat focado
    const chatButton = page.getByRole('button', { name: /chat ai/i })

    // Enter para abrir
    await chatButton.focus()
    await page.keyboard.press('Enter')

    await expect(page.getByRole('dialog')).toBeVisible()

    // Escape para fechar (se implementado)
    await page.keyboard.press('Escape')
  })
})
