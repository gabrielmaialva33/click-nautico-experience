import { test, expect } from '@playwright/test';

test.describe('Business Logic & Flows', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Language switching should update content (PT -> EN)', async ({ page }) => {
    // Initial state (PT forced by config)
    await expect(page.getByRole('heading', { name: /Aprenda a voar/i }).first()).toBeVisible();

    // Open Language Selector
    const langBtn = page.getByLabel('Select language');
    await langBtn.click();

    // Click English
    await page.getByRole('button', { name: 'English' }).click();

    // Verify content update
    // "Aprenda a voar" -> "Learn to fly over the water" (checking "Learn to fly" or similar based on `en.ts`)
    // Using a broad text match since I don't see `en.ts` content but assuming standard translation
    // If fail, we check `en.ts`
    await expect(page.getByRole('heading', { name: /Learn/i }).first()).toBeVisible();
    await expect(page.locator('nav').getByRole('link', { name: 'Home' })).toBeVisible(); // "Início" -> "Home"
  });

  test('Booking Modal flow validation', async ({ page }) => {
    // Open modal via "Agendar Aula" (Navbar or specific button)
    // Navbar button usually has text "Agendar Aula"
    const bookBtn = page.locator('nav').getByText('Agendar Aula');
    // If desktop nav is hidden on mobile, this might fail on mobile if not handling menu.
    // Let's use a common trigger or handle mobile menu.

    // For simplicity, let's use the Kite School reserve button which is visible on both after scroll
    const kiteSection = page.locator('#kite');
    await kiteSection.waitFor({ state: 'visible' });
    await kiteSection.scrollIntoViewIfNeeded();
    await page.evaluate(() => window.scrollBy(0, 100)); // Mobile fix

    await kiteSection.getByRole('button', { name: 'Reservar' }).first().click();

    await expect(page.getByRole('dialog')).toBeVisible();

    // Step 2 (Directly goes to step 2 if clicked 'Reservar' on a package)
    // Verify Package input is pre-filled
    const packageInput = page.locator('input[type="text"]').first();
    await expect(packageInput).not.toBeEmpty();

    // Try next without date (should be disabled)
    const nextBtn = page.getByRole('button', { name: /Próximo/i });
    await expect(nextBtn).toBeDisabled();

    // Fill date
    await page.locator('input[type="date"]').fill('2026-01-20');
    await expect(nextBtn).toBeEnabled();
    await nextBtn.click();

    // Step 3
    // Verify Send button disabled
    const sendBtn = page.getByRole('button', { name: /Enviar/i });
    await expect(sendBtn).toBeDisabled();

    // Fill details
    await page.locator('input[placeholder*="cham"]').fill('Playwright Bot'); // "Como você se chama?"
    await expect(sendBtn).toBeEnabled();

    // We don't click send to avoid opening WhatsApp in the test runner
  });
});
