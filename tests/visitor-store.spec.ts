import { test, expect } from '@playwright/test';

test.describe('Smart Visitor Store', () => {

  test.beforeEach(async ({ page }) => {
    // Clear storage before each test to ensure fresh start
    await page.addInitScript(() => {
      localStorage.clear();
    });
    await page.goto('/');
  });

  test('should initialize visitor store with default values', async ({ page }) => {
    // specific key defined in visitorStore.ts
    const STORAGE_KEY = 'click-nautico-visitor-storage';

    // Wait for hydration
    await page.waitForTimeout(1000);

    const storage = await page.evaluate((key) => {
      return localStorage.getItem(key);
    }, STORAGE_KEY);

    expect(storage).toBeTruthy();
    const parsed = JSON.parse(storage!);

    // Verify structure
    expect(parsed.state.visitorId).toBeTruthy();
    expect(parsed.state.role).toBe('visitor');
    expect(parsed.state.context.sessionCount).toBeGreaterThanOrEqual(1);
    expect(parsed.state.name).toBeNull();
  });

  test('should update lastSection tracking on scroll', async ({ page }) => {
    const STORAGE_KEY = 'click-nautico-visitor-storage';

    // Scroll to Tours section
    const toursSection = page.locator('#tours');
    await toursSection.scrollIntoViewIfNeeded();

    // Give IntersectionObserver time to fire
    await page.waitForTimeout(1000);

    const storage = await page.evaluate((key) => {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    }, STORAGE_KEY);

    expect(storage.state.context.lastSection).toBe('tours');
  });

  test('should execute SAVE_NAME client tool from AI response', async ({ page }) => {
    const STORAGE_KEY = 'click-nautico-visitor-storage';

    // Mock the AI Worker response
    await page.route('** /click-nautico-ai.gabrielmaialva33.workers.dev', async route => {
      const json = {
        choices: [
          {
            message: {
              content: "Nice to meet you! [SAVE_NAME: Playwright Bot]"
            }
          }
        ]
      };
      await route.fulfill({ json });
    });

    // Open Chat
    await page.getByRole('button', { name: /chat/i }).click();

    // Send message
    const input = page.getByPlaceholder('Digite sua mensagem...');
    await input.fill('Meu nome é Playwright Bot');
    await input.press('Enter');

    // Wait for response to appear in chat
    await expect(page.locator('.prose').last()).toContainText('Nice to meet you!');

    // Check if name was saved in storage
    const storage = await page.evaluate((key) => {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    }, STORAGE_KEY);

    expect(storage.state.name).toBe('Playwright Bot');
  });

  // Test Persistence across reloads
  test('should persist visitor ID across reloads', async ({ page }) => {
    const STORAGE_KEY = 'click-nautico-visitor-storage';

    await page.waitForTimeout(500);

    // Get initial ID
    const initialId = await page.evaluate((key) => {
      return JSON.parse(localStorage.getItem(key)!).state.visitorId;
    }, STORAGE_KEY);

    // Reload
    await page.reload();
    await page.waitForTimeout(500);

    // Get new ID
    const newId = await page.evaluate((key) => {
      return JSON.parse(localStorage.getItem(key)!).state.visitorId;
    }, STORAGE_KEY);

    expect(newId).toBe(initialId);
  });
});
