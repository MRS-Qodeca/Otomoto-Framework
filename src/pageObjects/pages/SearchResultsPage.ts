import { Locator } from '@playwright/test';
import { BasePage } from '../BasePage';

export class SearchResultsPage extends BasePage {
  public readonly path: string = '/osobowe';

  private get pageHeader(): Locator {
    return this.page.getByRole('heading', { level: 1 }).filter({ hasText: 'Samochody Osobowe' });
  }

  async getHeaderText(): Promise<string> {
    await this.page.waitForURL(`**${this.path}**`, { timeout: 5000 });
    await this.pageHeader.waitFor({ state: 'visible', timeout: 5000 });
    return await this.pageHeader.innerText();
  }
}
