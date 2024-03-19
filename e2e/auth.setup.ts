import { expect, Page } from '@playwright/test';
import { pluginTest as setup } from './plugin-def';
import credentials from '../playwright/.auth/credentials.json';
import { getHostInfo } from './config.info';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }: { page: Page }) => {
  const { protocolHostPort } = getHostInfo(credentials);
  // Perform authentication steps. Replace these actions with your own.
  await page.goto(`${protocolHostPort}/login`);
  await page.getByLabel('Username input field').fill(credentials.username);
  await page.getByLabel('Password input field').fill(credentials.password);
  await page.getByLabel('Login button').click();

  const skipBtn = await page.getByLabel('Skip');
  if (!!skipBtn) {
    await skipBtn.click();
  }

  // Wait until the page receives the cookies.
  //
  // Sometimes login flow sets cookies in the process of several redirects.
  // Wait for the final URL to ensure that the cookies are actually set.
  // Alternatively, you can wait until the page reaches a state where all cookies are set.
  await page.waitForURL("**/?orgId=1");
  await expect(page.getByTestId('sidemenu')).toBeVisible();
  // End of authentication steps.

  await page.context().storageState({ path: authFile });
});
