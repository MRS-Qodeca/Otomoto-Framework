import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SearchResultsPage } from '../pages/SearchResultsPage';
// Tu będziemy importować kolejne strony w miarę ich tworzenia / Here we will import additional pages as we create them

// Definiujemy typy dla naszych fixtures / Define types for our fixtures
type MyFixtures = {
  homePage: HomePage;
  searchResultsPage: SearchResultsPage;
  // Dodaj kolejne strony tutaj / Add more pages here
};

// Rozszerzamy bazowy test o nasze obiekty / Extend the base test with our page objects
export const pageFixture = base.extend<MyFixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },

  searchResultsPage: async ({ page }, use) => {
    const searchResultsPage = new SearchResultsPage(page);
    await use(searchResultsPage);
  },
});

export { expect } from '@playwright/test';
