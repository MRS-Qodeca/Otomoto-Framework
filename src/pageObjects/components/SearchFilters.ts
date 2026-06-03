import { Locator, Page } from '@playwright/test';
import { BasePageComponent } from '../BasePageComponent';

export interface SearchFiltersSelectors {
  root: string;
  yearFromPlaceholder: string;
  moreFiltersText: string;
  priceToPlaceholder: string;
}

export class SearchFilters extends BasePageComponent {
  private selectors: SearchFiltersSelectors;

  constructor(page: Page, selectors: SearchFiltersSelectors) {
    super(page, page.locator(selectors.root));
    this.selectors = selectors;
  }

  private get yearFromInput(): Locator {
    return this.page.getByPlaceholder(this.selectors.yearFromPlaceholder);
  }
  private get moreFiltersButton(): Locator {
    return this.page.locator('button').filter({ hasText: this.selectors.moreFiltersText });
  }
  private get priceToInput(): Locator {
    return this.page.getByPlaceholder(this.selectors.priceToPlaceholder).last();
  }

  // Ta metoda jest wywoływana TYLKO raz, przy pierwszym filtrze zaawansowanym
  private async ensureFiltersPanelIsOpen() {
    await this.page.waitForLoadState('domcontentloaded');
    if (await this.moreFiltersButton.isVisible()) {
      await this.moreFiltersButton.click();
      await this.yearFromInput.waitFor({ state: 'visible', timeout: 5000 });
    }
  }

  async setYearFrom(year: string) {
    await this.ensureFiltersPanelIsOpen();
    await this.yearFromInput.click();
    await this.yearFromInput.clear();
    await this.yearFromInput.pressSequentially(year, { delay: 50 });
    await this.page.waitForTimeout(200);
  }

  async setPriceTo(price: string) {
    await this.priceToInput.click();
    await this.priceToInput.clear();
    await this.priceToInput.pressSequentially(price, { delay: 50 });
    await this.page.waitForTimeout(200);
    await this.priceToInput.press('Enter');
    await this.page.locator('main article').first().waitFor({ state: 'visible', timeout: 10000 });
  }
}
