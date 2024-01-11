import { test as setup, expect } from '@playwright/test';
import credentials from '../playwright/.auth/credentials.json';

const authFile = 'playwright/.auth/user.json';

const protocolHostPort = 'http://localhost:3000'

setup('authenticate', async ({ page, context }) => {
  // Perform authentication steps. Replace these actions with your own.
  //   await page.goto('https://github.com/login');
  await page.goto(`${protocolHostPort}/login`);
  // await page.getByLabel('Username or email address').fill('username');
  await page.getByLabel('Username input field').fill(credentials.username);
  await page.getByLabel('Password input field').fill(credentials.password);
  // await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByLabel('Login button').click();
  console.log(page.url());
  // Wait until the page receives the cookies.
  //
  // Sometimes login flow sets cookies in the process of several redirects.
  // Wait for the final URL to ensure that the cookies are actually set.
  // await page.waitForURL("/?orgId=1");
  // Alternatively, you can wait until the page reaches a state where all cookies are set.
  // await expect(page.getByRole('button', { name: 'View profile and more' })).toBeVisible();
  await expect(page.getByTestId('sidemenu')).toBeVisible();
  // End of authentication steps.

  await page.context().storageState({ path: authFile });
});

