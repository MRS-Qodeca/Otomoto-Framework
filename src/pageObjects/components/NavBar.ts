import { BasePageComponent } from '../BasePageComponent';
import { Page } from '@playwright/test';

// 1. INTERFEJS FUNKCJONALNY - Co komponent potrafi / Defining WHAT the component can do (Functional Interface)
export interface INavBar {
  clickLink(linkKey: string): Promise<void>;
  search(query: string): Promise<void>;
  isLinkVisible(linkKey: string): Promise<boolean>;
}

// 2. SELEKTORY - Dane konfiguracyjne / Configuration data (Selectors)
export interface NavBarSelectors {
  root: string;
  links: Record<string, string>; // Mapa klucz -> selektor / Map key -> selector
  searchInput?: string;
}

// 3. KLASA - Implementacja logiki / Defining HOW the component does it (Implementation)
export class NavBar extends BasePageComponent implements INavBar {
  private readonly selectors: NavBarSelectors;

  constructor(page: Page, selectors: NavBarSelectors) {
    super(page, selectors.root);
    this.selectors = selectors;
  }

  /**
   * Klika w link zdefiniowany w mapie links na podstawie klucza /
   * Clicks a link defined in the links map based on the key
   */
  async clickLink(linkKey: string): Promise<void> {
    const selector = this.selectors.links[linkKey];
    if (!selector) {
      throw new Error(`Link with key "${linkKey}" is not defined in NavBarSelectors!`);
    }

    const linkLocator = this.root.locator(selector);
    /**
     * Używamy WebActions ukrytego w klasie bazowej (this.actions). /
     * Using WebActions hidden in the base class (this.actions)
     */
    await this.actions.clickElement(linkLocator);
  }

  /**
   * Wpisuje frazę w wyszukiwarkę i zatwierdza klawiszem Enter. /
   * Types a query into the search input and submits it with the Enter key.
   */
  async search(query: string): Promise<void> {
    if (!this.selectors.searchInput) {
      throw new Error(
        'Attempting to use search functionality, but search input is not defined in NavBarSelectors.',
      );
    }

    const searchField = this.root.locator(this.selectors.searchInput);

    await this.actions.typeElement(searchField, query);
    await this.page.keyboard.press('Enter');
  }

  /**
   * Sprawdza, czy konkretny link jest widoczny wewnątrz Navbaru
   * Checks if a specific link is visible within the Navbar
   */
  async isLinkVisible(linkKey: string): Promise<boolean> {
    const selector = this.selectors.links[linkKey];
    if (!selector) return false;

    // Szukamy elementu ściśle wewnątrz zakresu 'root'. / We look for the element strictly within the 'root' scope.
    return await this.root.locator(selector).isVisible();
  }
}
