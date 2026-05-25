import { test as base } from '@playwright/test';
import { ExampleComponent, ExampleSelectors } from '../components/ExampleComponent';
import { NavBar, NavBarSelectors } from '../components/NavBar';
import { Footer, FooterSelectors } from '../components/Footer';
import { Dropdown, DropdownSelectors } from '../components/Dropdown';
import { CheckboxGroup, CheckboxSelectors } from '../components/CheckboxGroup';
import { Button, ButtonSelectors } from '../components/Button';

// 1. Rozszerzamy typy o nasze komponenty / We extend the types with our components
type MyComponentFixtures = {
  exampleComponent: ExampleComponent;
  exampleOnMainPage: ExampleComponent;
  navBar: NavBar;
  footer: Footer;
  dropdown: Dropdown;
  checkboxGroup: CheckboxGroup;
  button: Button;
};

/**
 * Tu wrzucamy stałe dla konkretnego projektu, np. konfigurację NavBar i Footer /
 * Here we put constants for a specific project, e.g., NavBar and Footer configuration.
 */

const exampleComponentConfig: ExampleSelectors = {
  root: '.main-container',
  input: '#user-input',
  button: '.submit-btn',
};

const storeNavBarConfig: NavBarSelectors = {
  root: 'nav.flex',
  links: {
    home: 'link[name="Acme Store"]',
    all: 'text=All',
    shirts: 'text=Shirts',
    stickers: 'text=Stickers',
  },
  searchInput: 'placeholder="Search for products..."',
};

const storeFooterConfig: FooterSelectors = {
  root: 'footer',
  columns: 'nav > div',
  legalLinks: 'ul.flex-col',
  copyrightText: 'p.text-sm',
};

const dropdownConfig: DropdownSelectors = {
  root: 'select#dropdown',
};

const checkboxGroupConfig: CheckboxSelectors = {
  root: 'form#checkboxes',
};

const buttonConfig: ButtonSelectors = {
  root: 'button#submit',
};

// 2. Rozszerzamy bazę o nasze obiekty / We extend the base with our objects
export const componentFixture = base.extend<MyComponentFixtures>({
  exampleOnMainPage: async ({ page }, use) => {
    const component = new ExampleComponent(page, {
      root: '.main-container',
      input: '#user-input',
      button: '.submit-btn',
    });
    await use(component);
  },

  // NavBar
  navBar: async ({ page }, use) => {
    await use(new NavBar(page, storeNavBarConfig));
  },

  // Footer
  footer: async ({ page }, use) => {
    await use(new Footer(page, storeFooterConfig));
  },

  dropdown: async ({ page }, use) => {
    await use(new Dropdown(page, dropdownConfig));
  },

  // CheckboxGroup
  checkboxGroup: async ({ page }, use) => {
    await use(new CheckboxGroup(page, checkboxGroupConfig));
  },

  // Button
  button: async ({ page }, use) => {
    await use(new Button(page, buttonConfig));
  },
});
