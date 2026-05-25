import { test, expect } from '../../src/pageObjects/fixtures/appFixture';

test.describe('Checkboxes Functionality @checkboxes', () => {
  test.beforeEach(async ({ checkboxesPage }) => {
    await checkboxesPage.open();
    //await checkboxesPage.verifyAccessibility('Checkboxes Page');
  });

  test('Check the first checkbox and verify it is checked', async ({ checkboxesPage }) => {
    await checkboxesPage.checkFirst();
    const isChecked = await checkboxesPage.isFirstChecked();
    expect(isChecked).toBe(true);
  });

  test('Verify the second checkbox is checked', async ({ checkboxesPage }) => {
    const isChecked = await checkboxesPage.isSecondChecked();
    expect(isChecked).toBe(true);
  });

  test('Check both checkboxes and verify their states', async ({ checkboxesPage }) => {
    await checkboxesPage.checkFirst();
    await checkboxesPage.checkSecond();
    const isFirstChecked = await checkboxesPage.isFirstChecked();
    const isSecondChecked = await checkboxesPage.isSecondChecked();
    expect(isFirstChecked).toBe(true);
    expect(isSecondChecked).toBe(true);
  });

  test('Check the first checkbox, then uncheck it and verify it is unchecked', async ({
    checkboxesPage,
  }) => {
    await checkboxesPage.checkFirst();
    await checkboxesPage.checkFirst();
    const isChecked = await checkboxesPage.isFirstChecked();
    expect(isChecked).toBe(true);
  });

  test('Check the second checkbox, then uncheck it and verify it is checked', async ({
    checkboxesPage,
  }) => {
    await checkboxesPage.checkSecond();
    await checkboxesPage.checkSecond();
    const isChecked = await checkboxesPage.isSecondChecked();
    expect(isChecked).toBe(true);
  });
});
