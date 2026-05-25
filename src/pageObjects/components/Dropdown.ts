import { BasePageComponent } from '../BasePageComponent';
import { Page } from '@playwright/test';

// 1. INTERFEJS FUNKCJONALNY - Co komponent potrafi / Defining WHAT the component can do (Functional Interface)
export interface IDropdown {
  selectByText(text: string): Promise<void>;
  selectByValue(value: string): Promise<void>;
  getSelectedOptionText(): Promise<string>;
}

// 2. SELEKTORY - Dane konfiguracyjne / Configuration data (Selectors)
export interface DropdownSelectors {
  root: string; // Selektor głównego tagu <select> / Selector for the main <select> tag
}

// 3. KLASA - Implementacja logiki / Defining HOW the component does it (Implementation)
export class Dropdown extends BasePageComponent implements IDropdown {
  private readonly selectors: DropdownSelectors;

  constructor(page: Page, selectors: DropdownSelectors) {
    super(page, selectors.root);
    this.selectors = selectors;
  }

  /**
   * Wybiera opcję z listy na podstawie widocznego tekstu. /
   * Selects an option from the dropdown based on the visible text.
   */
  async selectByText(text: string): Promise<void> {
    /**
     * Playwright posiada wbudowaną metodę selectOption dla tagów <select>. /
     * Playwright has a built-in selectOption method for <select> tags.
     */
    await this.root.selectOption({ label: text });
  }

  /**
   * Wybiera opcję na podstawie atrybutu "value" (np. value="1"). /
   * Selects an option based on the "value" attribute (e.g., value="1").
   */
  async selectByValue(value: string): Promise<void> {
    await this.root.selectOption({ value: value });
  }

  /**
   * Pobiera tekst aktualnie wybranej opcji. /
   * Gets the text of the currently selected option.
   */
  async getSelectedOptionText(): Promise<string> {
    /**
     * Używamy evaluate, aby pobrać tekst z wybranego elementu DOM. /
     * We use evaluate to get the text from the selected DOM element.
     */
    return await this.root.evaluate((el: HTMLSelectElement) => el.options[el.selectedIndex].text);
  }
}
