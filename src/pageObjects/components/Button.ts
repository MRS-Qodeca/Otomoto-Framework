import { BasePageComponent } from '../BasePageComponent';
import { Page } from '@playwright/test';

// 1. INTERFEJS FUNKCJONALNY - Co komponent potrafi / Defining WHAT the component can do (Functional Interface)
export interface IButton {
  click(): Promise<void>;
  getText(): Promise<string>;
  isDisabled(): Promise<boolean>;
}

// 2. SELEKTORY - Dane konfiguracyjne / Configuration data (Selectors)
export interface ButtonSelectors {
  root: string;
}

// 3. KLASA - Implementacja logiki / Defining HOW the component does it (Implementation)
export class Button extends BasePageComponent implements IButton {
  private readonly selectors: ButtonSelectors;

  constructor(page: Page, selectors: ButtonSelectors) {
    super(page, selectors.root);
    this.selectors = selectors;
  }

  async click(): Promise<void> {
    // Używamy naszych pancernych akcji
    await this.actions.clickElement(this.root);
  }

  async getText(): Promise<string> {
    return (await this.root.textContent()) || '';
  }

  async isDisabled(): Promise<boolean> {
    return await this.root.isDisabled();
  }
}
