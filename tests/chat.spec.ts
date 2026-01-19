import { test, expect } from '@playwright/test';

test.describe('Chat Widget', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should open and interact with chat', async ({ page }) => {
    // Use the new aria-label
    const chatButton = page.getByLabel('Chat AI');
    await expect(chatButton).toBeVisible();

    // Open chat
    await chatButton.click();

    // Check if ChatContainer appears
    // We can look for the placeholder in the textarea
    const chatInput = page.getByPlaceholder(/Manda tua pergunta/i);
    await expect(chatInput).toBeVisible();

    // Close chat by clicking the button again
    await chatButton.click();

    // Wait for animation to complete
    await page.waitForTimeout(500);

    // Should be closed
    await expect(chatInput).not.toBeVisible();
  });
});
