import { Locator, Page, expect } from '@playwright/test';

export class LoginPage {
  private page: Page;
  private loginButtonHeader: Locator;
  private emailInput: Locator;
  private passwordInput: Locator;
  private submitButton: Locator;
  private errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    // Selektor z Twojego snapshotu - szukamy przycisku logowania w nagłówku
    this.loginButtonHeader = page.getByRole('button', { name: 'Zaloguj się' }).first();

    // Pola formularza logowania
    this.emailInput = page.locator('input[type="email"], input[name="username"]');
    this.passwordInput = page.locator('input[type="password"]');
    this.submitButton = page.locator('button[type="submit"]').filter({ hasText: /Zaloguj się/ });

    // Elastyczny lokator dla komunikatu błędu na produkcji
    this.errorMessage = page
      .locator('[class*="error"], [class*="alert"], text="Niepoprawny e-mail lub hasło"')
      .first();
  }

  async navigateToLogin() {
    await this.loginButtonHeader.click();
    await this.emailInput.waitFor({ state: 'visible', timeout: 5000 });
  }

  async enterEmail(email: string) {
    await this.emailInput.fill(email);
  }

  async enterPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async clickSubmit() {
    await this.submitButton.click();
  }

  async verifyLoginError() {
    await expect(this.errorMessage).toBeVisible({ timeout: 7000 });
  }
}
