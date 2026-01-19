import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility', () => {
  test('should pass WCAG 2.1 AA guidelines', async ({ page }) => {
    await page.goto('/');

    // Wait for content to load
    await page.waitForSelector('main');

    // Run Axe scan
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      // Exclude specific 3rd party widgets if they cause issues (e.g., chat)
      // .exclude('#chat-widget')
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should pass a11y checks for modal', async ({ page }) => {
    await page.goto('/');

    // Open Booking Modal (using any reserve button)
    const reserveBtn = page.getByRole('button', { name: 'Reservar' }).first();
    // Scroll to it
    await reserveBtn.scrollIntoViewIfNeeded();
    await reserveBtn.click();

    await expect(page.getByRole('dialog')).toBeVisible();

    const accessibilityScanResults = await new AxeBuilder({ page })
      .include('[role="dialog"]')
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
