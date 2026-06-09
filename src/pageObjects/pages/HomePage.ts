import { Locator } from '@playwright/test';
import { BasePage } from '../BasePage';

export class HomePage extends BasePage {
  public readonly path: string = '/';

  private get acceptCookiesButton(): Locator {
    return this.page.getByRole('button', { name: 'Zezwól na wszystkie' });
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
    try {
      await this.acceptCookiesButton.waitFor({ state: 'visible', timeout: 4000 });
      await this.acceptCookiesButton.click();

      await this.page
        .locator('.onetrust-pc-dark-filter')
        .waitFor({ state: 'hidden', timeout: 3000 })
        .catch(() => {});

      await this.page
        .locator('#onetrust-consent-sdk')
        .waitFor({ state: 'hidden', timeout: 5000 })
        .catch(() => {});
    } catch {
      console.log('ℹ️ Baner cookies nie pojawił się (sesja czysta lub zapamiętana).');
    }
  }

  private async selectOptionFromDropdown(dropdownLocator: Locator, optionText: string) {
    await dropdownLocator.click();
    const option = this.page.locator(`div[role="option"]:has-text("${optionText}")`).first();
    await option.waitFor({ state: 'visible', timeout: 3000 });
    await option.click();
  }

  async selectMake(makeName: string) {
    await this.selectOptionFromDropdown(this.makeDropdown, makeName);
    await this.page.waitForTimeout(500);
  }

  async selectModel(modelName: string) {
    await this.selectOptionFromDropdown(this.modelDropdown, modelName);
  }

  async clickSearch() {
    await this.searchButton.waitFor({ state: 'visible', timeout: 3000 });
    await this.searchButton.click();
  }
}
