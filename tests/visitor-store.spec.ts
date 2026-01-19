import { test, expect } from '@playwright/test';

test.describe('Smart Visitor Store', () => {

  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.clear();
    });
    await page.goto('/');
    await page.waitForTimeout(500);
  });

  test('should initialize visitor store', async ({ page }) => {
    const STORAGE_KEY = 'click-nautico-visitor-storage';
    await page.waitForTimeout(1000);
    const storage = await page.evaluate((key) => localStorage.getItem(key), STORAGE_KEY);
    expect(storage).toBeTruthy();
  });

  test('should update lastSection tracking on scroll', async ({ page }) => {
    const STORAGE_KEY = 'click-nautico-visitor-storage';

    // Force instant scroll to target
    await page.evaluate(() => {
      const el = document.getElementById('tours');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    });

    // Generous wait for Observer
    await page.waitForTimeout(2000);

    const match = await page.evaluate((key) => {
      const raw = localStorage.getItem(key);
      if (!raw) return false;
      const parsed = JSON.parse(raw);
      // Check exact match
      return parsed.state.context.lastSection === 'tours';
    }, STORAGE_KEY);

    expect(match).toBeTruthy();
  });

  test('should persist name across reloads (E2E Flow)', async ({ page }) => {
    const STORAGE_KEY = 'click-nautico-visitor-storage';

    // 1. Mock AI to save name
    await page.route('**', async route => {
      const url = route.request().url();
      if (url.includes('click-nautico-ai')) {
        await route.fulfill({
          body: `data: ${JSON.stringify({ choices: [{ delta: { content: "Saved! [SAVE_NAME: Real User]" } }] })}\n\ndata: [DONE]\n\n`,
          headers: { 'Content-Type': 'text/event-stream' }
        });
      } else {
        await route.continue();
      }
    });

    // 2. Open Chat & Interact
    await page.getByRole('button', { name: /chat/i }).click();
    await page.getByPlaceholder(/Manda tua pergunta/i).fill('Sou Real User');
    await page.getByPlaceholder(/Manda tua pergunta/i).press('Enter');

    // 3. Wait for UI confirmation (implies store update)
    await expect(page.locator('.whitespace-pre-wrap').last()).toContainText('Saved!');

    // 4. Verify Storage BEFORE reload
    const nameBefore = await page.evaluate((key) => JSON.parse(localStorage.getItem(key)!).state.name, STORAGE_KEY);
    expect(nameBefore).toBe('Real User');

    // 5. RELOAD
    await page.reload();
    await page.waitForTimeout(1000);

    // 6. Verify Storage AFTER reload
    const nameAfter = await page.evaluate((key) => JSON.parse(localStorage.getItem(key)!).state.name, STORAGE_KEY);
    expect(nameAfter).toBe('Real User');
  });
});
