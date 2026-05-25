import { BasePage } from '../BasePage';
import { Dropdown } from '../components/Dropdown';
import { Page } from '@playwright/test';

export class DropdownPage extends BasePage {
  protected readonly path = '/dropdown';
  public readonly dropdown: Dropdown;

  constructor(page: Page) {
    super(page);
    this.dropdown = new Dropdown(page, { root: 'select#dropdown' });
  }
}
