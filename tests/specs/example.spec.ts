import { test, expect } from '../../src/pageObjects/fixtures/appFixture';

test.describe('Example Functionality @smoke', () => {
  /**
   * Na wszelki wypadek beforeEach, jeśli każda asercja wymagałaby odświeżenia strony. /
   * We use beforeEach, in case each assertion requires refreshing the page.
   */
  test.beforeEach(async ({ examplePage }) => {
    await examplePage.open();
    /**
     * Opcjonalne, ale bardzo przydatne - skanowanie dostępności strony zgodnie ze standardami WCAG. /
     * Optional but very useful - performing an accessibility scan of the page according to WCAG standards.
     */
    //await examplePage.verifyAccessibility('Example Page');
  });

  test('User can do something', async ({ exampleOnMainPage }) => {
    await exampleOnMainPage.doSomething('Magnus Test');
    const value = await exampleOnMainPage.getValue();
    expect(value).toBe('Magnus Test');
  });
});
