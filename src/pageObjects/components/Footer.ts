import { BasePageComponent } from '../BasePageComponent';
import { Page } from '@playwright/test';

// 1. INTERFEJS FUNKCJONALNY - Co komponent potrafi / Defining WHAT the component can do (Functional Interface)
export interface IFooter {
  getCopyrightText(): Promise<string>;
  clickLegalLink(text: string): Promise<void>;
  getColumnsCount(): Promise<number>;
}

// 2. SELEKTORY - Dane konfiguracyjne / Configuration data (Selectors)
export interface FooterSelectors {
  root: string;
  columns?: string;
  legalLinks?: string;
  copyrightText?: string;
}

// 3. KLASA - Implementacja logiki / Defining HOW the component does it (Implementation)
export class Footer extends BasePageComponent implements IFooter {
  private readonly selectors: FooterSelectors;

  constructor(page: Page, selectors: FooterSelectors) {
    super(page, selectors.root);
    this.selectors = selectors;
  }

  async getCopyrightText(): Promise<string> {
    /**
     * Jeśli nie podano selektora, zwracamy pusty string zamiast błędu. /
     * If no selector is provided, we return an empty string instead of throwing an error.
     */
    if (!this.selectors.copyrightText) return '';
    return (await this.root.locator(this.selectors.copyrightText).textContent()) || '';
  }

  async clickLegalLink(text: string): Promise<void> {
    if (!this.selectors.legalLinks) {
      throw new Error(
        'Attempting to click a legal link, but selector is not defined for this page!',
      );
    }
    /**
     * Używamy WebActions ukrytego w klasie bazowej (this.actions). /
     * We use WebActions hidden in the base class (this.actions).
     */
    const link = this.root.locator(this.selectors.legalLinks).getByText(text);
    await this.actions.clickElement(link);
  }

  async getColumnsCount(): Promise<number> {
    if (!this.selectors.columns) return 0;
    return await this.root.locator(this.selectors.columns).count();
  }
}
