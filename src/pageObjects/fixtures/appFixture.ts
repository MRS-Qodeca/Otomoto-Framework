import { test as base } from 'playwright-bdd';
import { pageFixture } from './pageFixture';
import { componentFixture } from './componentFixture';
import { allure } from 'allure-playwright';
import { mergeTests } from '@playwright/test';

/**
 * Łączymy pageFixtures i componentFixtures. /
 * We merge pageFixtures and componentFixtures.
 */
const combinedPagesAndComponents = mergeTests(pageFixture, componentFixture);

/**
 * Tworzymy finalny obiekt 'test', łącząc bazę z BDD oraz strony z POM.
 * We create the final 'test' object by merging the BDD base with POM pages.
 */
const bddWithPages = mergeTests(base, combinedPagesAndComponents);

/**
 * Rozszerzamy całość o logikę Allure. /
 * We extend everything with Allure logic.
 */
export const test = bddWithPages.extend<{ allureMetadata: void }>({
  allureMetadata: [
    async ({}, use, testInfo) => {
      const tags = testInfo.title.match(/@\w+/g);

      if (tags) {
        for (const tag of tags) {
          const cleanTag = tag.replace('@', '');
          await allure.tag(cleanTag);

          if (['critical', 'blocker', 'minor'].includes(cleanTag)) {
            await allure.severity(cleanTag as any);
          }
        }
      }

      await use();
    },
    { auto: true },
  ],
});

export { expect } from '@playwright/test';
