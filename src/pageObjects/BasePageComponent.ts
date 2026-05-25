/**
 * To jest klasa bazowa dla wszystkich komponentów stron w naszym frameworku. Zawiera wspólne właściwości i metody, które mogą być używane przez wszystkie komponenty. /
 * This is the base class for all page components in our framework. It contains common properties and methods that can be used by all components.
 */

import { Page, Locator } from '@playwright/test';
import { WebActions } from '../utils/WebActions';

export abstract class BasePageComponent {
  protected readonly page: Page;
  protected readonly root: Locator;
  protected readonly actions: WebActions;

  // Unia typów 'string | Locator' / 'string | Locator' type union
  constructor(page: Page, rootSelector: string | Locator) {
    this.page = page;
    this.actions = new WebActions(this.page);

    // Logika zamiany stringa na Locator / Logic to convert string to Locator
    this.root = typeof rootSelector === 'string' ? page.locator(rootSelector) : rootSelector;
  }
}
