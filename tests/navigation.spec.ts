import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display navbar with logo and links (Desktop)', async ({ page, isMobile }) => {
    if (isMobile) return;

    await expect(page.locator('nav a >> text=CLICK NÁUTICO').first()).toBeVisible();

    const nav = page.locator('nav');
    // On desktop, target the desktop menu specifically (.hidden.md:flex)
    const desktopMenu = nav.locator('.md\\:flex');
    await expect(desktopMenu.getByRole('link', { name: 'Início' })).toBeVisible();
    await expect(desktopMenu.getByRole('link', { name: 'Kite School' })).toBeVisible();
    await expect(desktopMenu.getByRole('link', { name: 'Passeios' })).toBeVisible();
  });

  test('should navigate to sections', async ({ page, isMobile }) => {
    // Verify sections exist
    await expect(page.getByRole('heading', { name: /Aprenda a voar/i }).first()).toBeVisible();
    await expect(page.getByRole('heading', { name: /Explore o Caribe/i }).first()).toBeVisible();
  });

  test('should toggle mobile menu', async ({ page, isMobile }) => {
    if (!isMobile) return;

    const toggleBtn = page.getByLabel('Toggle menu');
    await toggleBtn.click();

    // Wait for animation
    await page.waitForTimeout(500);

    // Target the mobile menu specifically (the one that appears)
    const mobileMenu = page.locator('nav .md\\:hidden.bg-white');
    // .md:hidden class might be on the button too, but the menu is the div below
    // The menu has 'border-t' usually or we can find by content

    await expect(mobileMenu.getByRole('link', { name: 'Início' })).toBeVisible();
    await expect(mobileMenu.getByRole('link', { name: 'Kite School' })).toBeVisible();

    // Close it
    await toggleBtn.click();
    await page.waitForTimeout(500);
    await expect(mobileMenu.getByRole('link', { name: 'Início' })).not.toBeVisible();
  });
});
