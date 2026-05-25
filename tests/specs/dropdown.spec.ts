import { test, expect } from '../../src/pageObjects/fixtures/appFixture';

test.describe('Dropdown Functionality @dropdown', () => {
  test.beforeEach(async ({ dropdownPage }) => {
    await dropdownPage.open();
    //await dropdownPage.verifyAccessibility('Dropdown Page');
  });

  test('Select option by text', async ({ dropdown }) => {
    await dropdown.selectByText('Option 1');

    const selectedValue = await dropdown.getSelectedOptionText();
    expect(selectedValue).toBe('Option 1');
  });

  test('Select option by value', async ({ dropdown }) => {
    await dropdown.selectByValue('2');

    const selectedValue = await dropdown.getSelectedOptionText();
    expect(selectedValue).toBe('Option 2');
  });
});
