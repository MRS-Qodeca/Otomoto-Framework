import { test, expect } from '../../src/pageObjects/fixtures/appFixture';

test.describe('Login Functionality @smoke @login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
    // await loginPage.verifyAccessibility('Login Page');
  });

  test('Login successfully with basic auth', async ({ loginPage }) => {
    const message = await loginPage.getSuccessText();
    expect(message).toContain('Congratulations!');
  });

  test('Display correct header after login', async ({ loginPage }) => {
    const header = await loginPage.getHeaderText();
    expect(header).toBe('Basic Auth');
  });
});
