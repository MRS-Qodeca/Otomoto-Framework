import playwright from 'eslint-plugin-playwright';
import tseslint from 'typescript-eslint';
import eslint from '@eslint/js';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ...playwright.configs['flat/recommended'],
    rules: {
      ...playwright.configs['flat/recommended'].rules,
      'playwright/no-skipped-test': 'off',
    },
  },
  {
    rules: {
      'quotes': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  // To wyklucza foldery z raportami, żeby ESLint ich nie sprawdzał  / This excludes report folders so that ESLint does not check them
  {
    ignores: ['node_modules/', 'playwright-report/', 'test-results/', '.features-gen/'],
  }
);
