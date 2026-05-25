import { Locator } from '@playwright/test';
import { BasePage } from '../BasePage';

export class SearchResultsPage extends BasePage {
  public readonly path: string = '/osobowe';

  private get pageHeader(): Locator {
    return this.page.locator('h1');
  }

  async getHeaderText(): Promise<string> {
    await this.pageHeader.waitFor({ state: 'visible', timeout: 5000 });
    return await this.pageHeader.innerText();
  }
}