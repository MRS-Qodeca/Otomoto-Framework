import { test as base } from '@playwright/test';
import { SearchFilters } from '../components/SearchFilters';

// 1. Rozszerzamy typy o nasze komponenty / We extend the types with our components
type MyComponentFixtures = {
  searchFilters: SearchFilters;
};

/**
 * Tu wrzucamy stałe dla konkretnego projektu, np. konfigurację NavBar i Footer /
 * Here we put constants for a specific project, e.g., NavBar and Footer configuration.
 */
const searchFiltersConfig = {
  root: 'main',
  yearFromPlaceholder: 'Rok od',
  moreFiltersText: 'Więcej filtrów',
  priceToPlaceholder: 'Cena do',
};

// 2. Rozszerzamy bazę o nasze obiekty / We extend the base with our objects
export const componentFixture = base.extend<MyComponentFixtures>({
  searchFilters: async ({ page }, use) => {
    await use(new SearchFilters(page, searchFiltersConfig));
  },
});
