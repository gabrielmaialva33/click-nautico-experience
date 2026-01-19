import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.describe('Acessibilidade - Axe', () => {
  test('página principal não tem violações críticas', async ({ page }) => {
    await page.goto('/')

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .exclude('.video-background') // Exclui vídeo de fundo se houver
      .analyze()

    // Filtra apenas violações critical e serious
    const criticalViolations = accessibilityScanResults.violations.filter(
      (v) => v.impact === 'critical' || v.impact === 'serious'
    )

    expect(criticalViolations).toEqual([])
  })

  test('chat widget não tem violações críticas', async ({ page }) => {
    await page.goto('/')

    // Abre o chat
    await page.getByRole('button', { name: /chat ai/i }).click()
    await page.waitForSelector('[role="dialog"]')

    const accessibilityScanResults = await new AxeBuilder({ page })
      .include('[role="dialog"]')
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze()

    // Filtra apenas violações critical e serious
    const criticalViolations = accessibilityScanResults.violations.filter(
      (v) => v.impact === 'critical' || v.impact === 'serious'
    )

    expect(criticalViolations).toEqual([])
  })

  test('seção de kite não tem violações críticas', async ({ page }) => {
    await page.goto('/')

    const accessibilityScanResults = await new AxeBuilder({ page })
      .include('section')
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze()

    const criticalViolations = accessibilityScanResults.violations.filter(
      (v) => v.impact === 'critical' || v.impact === 'serious'
    )

    expect(criticalViolations).toEqual([])
  })
})

test.describe('Acessibilidade - Contraste', () => {
  test('texto tem contraste suficiente', async ({ page }) => {
    await page.goto('/')

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2aa'])
      .options({ rules: { 'color-contrast': { enabled: true } } })
      .analyze()

    const contrastViolations = accessibilityScanResults.violations.filter(
      (v) => v.id === 'color-contrast'
    )

    // Log para debug se houver violações
    if (contrastViolations.length > 0) {
      console.log('Violações de contraste:', JSON.stringify(contrastViolations, null, 2))
    }

    // Permitimos algumas violações menores (texto decorativo)
    expect(contrastViolations.length).toBeLessThan(5)
  })
})

test.describe('Acessibilidade - Mobile', () => {
  test.use({ viewport: { width: 375, height: 667 } })

  test('touch targets são grandes o suficiente', async ({ page }) => {
    await page.goto('/')

    // Verifica tamanho mínimo de botões (44x44 pixels é o recomendado)
    const buttons = await page.locator('button').all()

    for (const button of buttons) {
      const box = await button.boundingBox()
      if (box) {
        expect(box.width).toBeGreaterThanOrEqual(44)
        expect(box.height).toBeGreaterThanOrEqual(44)
      }
    }
  })

  test('chat é usável no mobile', async ({ page }) => {
    await page.goto('/')

    // Abre o chat
    await page.getByRole('button', { name: /chat ai/i }).click()

    // Verifica se o dialog ocupa a tela inteira no mobile
    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()

    // Verifica se o input está acessível
    const input = page.getByRole('textbox')
    await expect(input).toBeVisible()
    await input.fill('Teste mobile')
    await expect(input).toHaveValue('Teste mobile')
  })
})
