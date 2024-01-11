import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  // await page.goto('https://playwright.dev/');
  await page.goto('http://localhost:3000')

  // Expect a title "to contain" a substring.
  // await expect(page).toHaveTitle(/Playwright/);
  await expect(page).toHaveTitle(/Grafana/);
});

test('get login', async ({ page }) => {
  // await page.goto('https://playwright.dev/');
  await page.goto('http://localhost:3000/login')

  // Click the get started link.
  // await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByText('Welcome to Grafana')).toBeVisible();
  // await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
