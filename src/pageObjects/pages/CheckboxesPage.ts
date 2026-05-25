import { BasePage } from '../BasePage';
import { CheckboxGroup } from '../components/CheckboxGroup';
import { Page } from '@playwright/test';

export class CheckboxesPage extends BasePage {
  protected readonly path = '/checkboxes';

  // Komponent jako publiczny atrybut - pełna kompozycja / Component as a public attribute - full composition
  public readonly group: CheckboxGroup;

  constructor(page: Page) {
    super(page);
    // Inicjalizujemy komponent z rootem 'form#checkboxes' / Initialize the component with the root 'form#checkboxes'
    this.group = new CheckboxGroup(page, { root: 'form#checkboxes' });
  }

  async checkFirst() {
    await this.group.checkByIndex(0);
  }

  async isFirstChecked(): Promise<boolean> {
    return await this.group.isChecked(0);
  }

  async checkSecond() {
    await this.group.checkByIndex(1);
  }

  async isSecondChecked(): Promise<boolean> {
    return await this.group.isChecked(1);
  }
}
