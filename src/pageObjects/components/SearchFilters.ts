import { Locator, Page } from '@playwright/test';
import { BasePageComponent } from '../BasePageComponent';

export interface SearchFiltersSelectors {
  root: string;
  yearFromPlaceholder: string;
  fuelTypePlaceholder: string;
  moreFiltersText: string;
  countryPlaceholder: string;
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

  private get fuelTypeDropdown(): Locator {
    return this.page.getByPlaceholder(this.selectors.fuelTypePlaceholder);
  }

  private get moreFiltersButton(): Locator {
    return this.page.locator('button').filter({ hasText: this.selectors.moreFiltersText });
  }

  private get countryOfOriginDropdown(): Locator {
    return this.page.getByPlaceholder(this.selectors.countryPlaceholder);
  }

  private async ensureFiltersPanelIsOpen() {
    if (await this.moreFiltersButton.isVisible()) {
      await this.moreFiltersButton.click();
      await this.yearFromInput.waitFor({ state: 'visible', timeout: 3000 });
    }
  }

  private async selectOption(dropdownLocator: Locator, optionText: string) {
    await dropdownLocator.click();
    await dropdownLocator.fill(optionText);

    const option = this.page
      .locator('[class*="dropdown"], [class*="menu"], [class*="list"], [role="listbox"]')
      .getByText(optionText, { exact: true })
      .first();

    await option.waitFor({ state: 'visible', timeout: 3000 });
    await option.click();
  }

  async setYearFrom(year: string) {
    await this.ensureFiltersPanelIsOpen();
    await this.yearFromInput.click();
    await this.yearFromInput.fill(year);
    await this.yearFromInput.press('Enter');
  }

  async selectFuelType(fuelType: string) {
    await this.ensureFiltersPanelIsOpen();
    await this.selectOption(this.fuelTypeDropdown, fuelType);
  }

  async selectCountryOfOrigin(countryName: string) {
    await this.ensureFiltersPanelIsOpen();
    await this.selectOption(this.countryOfOriginDropdown, countryName);
  }
}
