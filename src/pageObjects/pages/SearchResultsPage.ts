import { Locator } from '@playwright/test';
import { BasePage } from '../BasePage';

export class SearchResultsPage extends BasePage {
  public readonly path: string = '/osobowe/';

  private get vehicleCardTitles(): Locator {
    return this.page.locator('main article h2');
  }

  private get resultsArticles(): Locator {
    return this.page.locator('main article');
  }

  async waitForResultsPage() {
    await this.page.waitForURL(new RegExp(this.path), {
      waitUntil: 'domcontentloaded',
      timeout: 8000,
    });
  }

  async areResultsOrNoResultsMessageVisible(): Promise<boolean> {
    const count = await this.resultsArticles.count();
    const isNoResultsVisible = await this.page.getByText('Nie znaleźliśmy ogłoszeń').isVisible();
    return count > 0 || isNoResultsVisible;
  }

  async getAllResultTitles(): Promise<string[]> {
    await this.resultsArticles.first().waitFor({ state: 'visible', timeout: 5000 });

    // allTextContents() zbiera teksty ze wszystkich kafelków na raz do tablicy stringów
    return await this.vehicleCardTitles.allTextContents();
  }
}
