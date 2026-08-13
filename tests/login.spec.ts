import { test, expect } from '../fixtures/test-fixtures';
import { TEST_USERS } from '../data/testData';

test.describe('Login', () => {
  test('standard user can sign in', async ({ page, loginPage }) => {
    await loginPage.open();
    await loginPage.login(TEST_USERS.standard.username, TEST_USERS.standard.password);

    await expect(page).not.toHaveURL(/login/);
    console.log('page', page);
  });

  test('admin user can sign in', async ({ page, loginPage }) => {
    await loginPage.open();
    await loginPage.login(TEST_USERS.admin.username, TEST_USERS.admin.password);

    await expect(page).not.toHaveURL(/login/);
    console.log('page', page);
  });

  test('locked user stays on login page', async ({ page, loginPage, screenshots }) => {
    await loginPage.open();
    await loginPage.login(TEST_USERS.locked.username, TEST_USERS.locked.password); 
    await expect(page).toHaveURL(/login/);
    console.log('page', page);
    await expect(loginPage.errorMessage).toBeVisible();
    await screenshots.capture('locked-user-error');
  });

  test('invalid credentials stay on login page', async ({ page, loginPage, screenshots }) => {
    await loginPage.open();
    await loginPage.login(TEST_USERS.invalid.username, TEST_USERS.invalid.password);

    await expect(page).toHaveURL(/login/);
    await expect(loginPage.errorMessage).toBeVisible();
    await screenshots.capture('invalid-credentials-error');
  });
});
