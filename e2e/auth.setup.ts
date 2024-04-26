import { expect, Locator, Page } from '@playwright/test';
import { pluginTest as setup } from './plugin-def';
import credentials from '../playwright/.auth/credentials.json';
import { getHostInfo } from './config.info';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }: { page: Page }) => {
  const { protocolHostPort, version } = await getHostInfo(credentials);
  // Perform authentication steps. Replace these actions with your own.
  let skipBtn: Locator | null = null;
  const isGrafanaVersionBelow10 = /^[0-9]\..*/.test(version);
  console.log(`[auth.setup.authenticate]: Detected Grafana version ${version}`);
  if (!isGrafanaVersionBelow10) {
    await page.goto(`${protocolHostPort}/login`);
    await page.getByLabel('Username input field').or(page.getByTestId(/Username input field/)).fill(credentials.username);
    await page.getByLabel('Login button').or(page.getByTestId(/Password input field/)).fill(credentials.password);
    await page.getByLabel('Login button').or(page.getByTestId(/Login button/)).click();

    skipBtn = await page.getByLabel('Skip').or(page.getByTestId(/Skip change password button/));
  } else {
    await page.goto(`${protocolHostPort}/login`);
    await page.getByLabel('Username input field').fill(credentials.username);
    await page.getByLabel('Password input field').fill(credentials.password);
    await page.getByLabel('Login button').click();

    skipBtn = await page.getByLabel('Skip');
  }
  if (!!skipBtn) {
    await skipBtn.click();
  }

  // Wait until the page receives the cookies.
  //
  // Sometimes login flow sets cookies in the process of several redirects.
  // Wait for the final URL to ensure that the cookies are actually set.
  // Alternatively, you can wait until the page reaches a state where all cookies are set.
  await page.waitForURL("**/?orgId=1");
  if (!isGrafanaVersionBelow10) {
    await expect(page.getByTestId('sidemenu').or(page.getByTestId(/Toggle menu/))).toBeVisible();
  } else {
    await expect(page.getByTestId('sidemenu')).toBeVisible();
  }
  // End of authentication steps.

  await page.context().storageState({ path: authFile });
});
