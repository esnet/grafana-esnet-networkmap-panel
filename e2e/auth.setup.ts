import { expect, Page } from '@playwright/test';
import { pluginTest as setup } from './plugin-def';
import credentials from '../playwright/.auth/credentials.json';
import { getHostInfo } from './config.info';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }: { page: Page }) => {
  const { protocolHostPort } = getHostInfo(credentials);
  // Perform authentication steps. Replace these actions with your own.
  await page.goto(`${protocolHostPort}/login`);
  await page.getByLabel('Email or username').fill(credentials.username);
  await page.getByPlaceholder('password').fill(credentials.password);
  await page.getByRole('button', {name: 'Log in'}).click();

  const skipBtn = await page.getByRole('button', { name: 'Skip'});
  if (!!skipBtn) {
    await skipBtn.click();
  }

  // Wait until the page receives the cookies.
  //
  // Sometimes login flow sets cookies in the process of several redirects.
  // Wait for the final URL to ensure that the cookies are actually set.
  // Alternatively, you can wait until the page reaches a state where all cookies are set.
  await page.waitForURL("**/?orgId=1");
  const heroText = await page.locator('[data-testid*="Panel header"]').first();
  await expect(await heroText.innerText()).toContain('Welcome to Grafana');
  // End of authentication steps.

  await page.context().storageState({ path: authFile });
});
