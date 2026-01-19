import { test, expect } from '@playwright/test';

test.describe('Features Sections', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Kite School section should display courses and pricing', async ({ page }) => {
    const section = page.locator('#kite');
    await section.scrollIntoViewIfNeeded();
    // Trigger scroll event manually to ensure framer-motion detects view
    await page.evaluate(() => window.scrollBy(0, 100));
    // Give a small moment for animations to start/finish
    await page.waitForTimeout(1000);

    await expect(section).toBeVisible();

    // Check for main title (part of it) - "Aprenda a voar"
    await expect(section.getByRole('heading', { level: 2 }).filter({ hasText: /Aprenda a voar/i })).toBeVisible();

    // Check for course stages (circles with numbers 1, 2...)
    await expect(section.getByText('1', { exact: true })).toBeVisible();

    // Check for pricing cards (buttons exist) - "Reservar"
    const buttons = section.getByRole('button', { name: 'Reservar' });
    await expect(buttons.first()).toBeVisible();
  });

  test('Tours section should display tour options', async ({ page }) => {
    const section = page.locator('#tours');
    await section.waitFor({ state: 'attached' });
    await section.scrollIntoViewIfNeeded();
    await page.evaluate(() => window.scrollBy(0, 100));
    await page.waitForTimeout(1000);

    await expect(section).toBeVisible();

    // Check for cards with images
    const images = section.locator('img');
    await expect(images.first()).toBeVisible();

    // Check for CTA buttons - "Consultar Disponibilidade"
    const ctaButtons = section.getByRole('button', { name: /Consultar/i });
    await expect(ctaButtons.first()).toBeVisible();
  });

  test('WhatsApp integration links should be present', async ({ page, isMobile }) => {
    // Both sections have WhatsApp links often, or at least the Navbar and FloatingWhatsApp

    // Floating WhatsApp has aria-label="Contato via WhatsApp"
    const floatingWa = page.getByLabel('Contato via WhatsApp');
    await expect(floatingWa).toBeVisible();
  });
});
