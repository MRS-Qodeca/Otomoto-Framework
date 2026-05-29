import { Locator } from '@playwright/test';
import { BasePage } from '../BasePage';

export class HomePage extends BasePage {
  public readonly path: string = '/';

  private get acceptCookiesButton(): Locator {
    return this.page.locator('#onetrust-accept-btn-handler');
  }

  private get makeDropdown(): Locator {
    return this.page.getByPlaceholder('Marka pojazdu');
  }

  private get modelDropdown(): Locator {
    return this.page.getByPlaceholder('Model pojazdu');
  }

  private get searchButton(): Locator {
    return this.page.locator('button').filter({ hasText: 'Pokaż' });
  }

  async acceptCookies() {
    await this.acceptCookiesButton.waitFor({ state: 'visible', timeout: 5000 });
    await this.acceptCookiesButton.click();
  }

  private async selectOptionFromDropdown(dropdownLocator: Locator, optionText: string) {
    await dropdownLocator.click();
    const option = this.page.locator(`div[role="option"]:has-text("${optionText}")`).first();
    await option.waitFor({ state: 'visible', timeout: 5000 });
    await option.click();
  }

  async selectMake(makeName: string) {
    await this.selectOptionFromDropdown(this.makeDropdown, makeName);
  }

  async selectModel(modelName: string) {
    await this.selectOptionFromDropdown(this.modelDropdown, modelName);
  }

  async clickSearch() {
    await this.searchButton.waitFor({ state: 'visible', timeout: 5000 });
    await this.searchButton.click();
    await this.page.waitForURL('**/osobowe/**', { timeout: 7000 });
  }
}
