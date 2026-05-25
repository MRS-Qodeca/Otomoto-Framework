import { BasePageComponent } from '../BasePageComponent';
import { Page } from '@playwright/test';

// 1. INTERFEJS FUNKCJONALNY - Co komponent potrafi / Defining WHAT the component can do (Functional Interface)
export interface IExampleComponent {
  doSomething(value: string): Promise<void>;
  getValue(): Promise<string>;
}

// 2. SELEKTORY - Dane konfiguracyjne / Configuration data (Selectors)
export interface ExampleSelectors {
  root: string; // Zawsze wymagany! / Always required!
  input?: string; // Opcjonalne - nie każdy komponent musi mieć input. / Optional - not every component will have an input.
  button?: string; // Opcjonalne - nie każdy komponent musi mieć button. / Optional - not every component will have a button.
}

// 3. KLASA - Implementacja logiki / Defining HOW the component does it (Implementation)
export class ExampleComponent extends BasePageComponent implements IExampleComponent {
  private readonly selectors: ExampleSelectors;

  constructor(page: Page, selectors: ExampleSelectors) {
    super(page, selectors.root); // Przekazujemy root do bazy / Pass root to the base class
    this.selectors = selectors;
  }

  async doSomething(value: string): Promise<void> {
    if (!this.selectors.input) throw new Error('No input selector defined for ExampleComponent');
    const element = this.root.locator(this.selectors.input);
    await this.actions.typeElement(element, value);
  }

  async getValue(): Promise<string> {
    if (!this.selectors.input) return '';
    return (await this.root.locator(this.selectors.input).inputValue()) || '';
  }
}
