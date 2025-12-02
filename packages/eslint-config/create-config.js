import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';

export default function createConfig({
  ignores = [],
  files = [],
  extends: $extends = [],
  rules = {},
  plugins = {},
  ...options
} = {}) {
  return defineConfig({
    ignores: ['dist', 'node_modules', ...ignores],
    files: ['**/*.{ts,tsx}', ...files],
    plugins,
    extends: [js.configs.recommended, ...tseslint.configs.recommended, ...$extends],
    rules: {
      'no-console': 'error',
      'no-duplicate-imports': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/consistent-type-imports': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      ...rules,
    },
    ...options,
  });
}
