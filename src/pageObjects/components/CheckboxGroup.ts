import { BasePageComponent } from '../BasePageComponent';
import { Page } from '@playwright/test';

// 1. INTERFEJS FUNKCJONALNY - Co tester widzi w podpowiedziach / Defining WHAT the component can do (Functional Interface)
export interface ICheckboxGroup {
  checkByIndex(index: number): Promise<void>;
  uncheckByIndex(index: number): Promise<void>;
  isChecked(index: number): Promise<boolean>;
  getCheckboxesCount(): Promise<number>;
}

// 2. SELEKTORY - Dane konfiguracyjne / Configuration data (Selectors)
export interface CheckboxSelectors {
  root: string; // Kontener otaczający wszystkie checkboxy (np. 'form#checkboxes') / Container that wraps all checkboxes (e.g., 'form#checkboxes')
  item?: string; // Opcjonalny, jeśli chcielibyśmy zmienić domyślny 'input' / Optional, if we want to change the default 'input[type="checkbox"]'
}

// 3. KLASA - Implementacja logiki / Defining HOW the component does it (Implementation)
export class CheckboxGroup extends BasePageComponent implements ICheckboxGroup {
  private readonly selectors: CheckboxSelectors;
  private readonly defaultItemSelector = 'input[type="checkbox"]';

  constructor(page: Page, selectors: CheckboxSelectors) {
    super(page, selectors.root);
    this.selectors = selectors;
  }

  /**
   * Pomocnicza metoda do pobierania konkretnego checkboxa po indeksie. /
   * Helper method to get a specific checkbox by index.
   */
  private getCheckbox(index: number) {
    const itemSelector = this.selectors.item || this.defaultItemSelector;
    return this.root.locator(itemSelector).nth(index);
  }

  /**
   * Zaznacza checkbox na podstawie indeksu (0, 1, 2...). /
   * Checks a checkbox based on its index (0, 1, 2...).
   */
  async checkByIndex(index: number): Promise<void> {
    await this.getCheckbox(index).check();
  }

  /**
   * Odznacza checkbox na podstawie indeksu. /
   * Unchecks a checkbox based on its index.
   */
  async uncheckByIndex(index: number): Promise<void> {
    await this.getCheckbox(index).uncheck();
  }

  /**
   * Zwraca stan zaznaczenia (true/false) dla checkboxa na podstawie indeksu. /
   * Returns the checked state (true/false) for a checkbox based on its index.
   */
  async isChecked(index: number): Promise<boolean> {
    return await this.getCheckbox(index).isChecked();
  }

  /**
   * Zwraca liczbę wszystkich checkboxów w grupie. /
   * Returns the count of all checkboxes in the group.
   */
  async getCheckboxesCount(): Promise<number> {
    const itemSelector = this.selectors.item || this.defaultItemSelector;
    return await this.root.locator(itemSelector).count();
  }
}
