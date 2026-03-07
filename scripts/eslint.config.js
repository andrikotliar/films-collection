import createConfig from '@films-collection/eslint-config';

export default createConfig({
  rules: {
    '@typescript-eslint/no-empty-object-type': ['off'],
  },
  languageOptions: {
    parserOptions: {
      tsconfigRootDir: import.meta.dirname,
    },
  },
  ignores: ['node_modules'],
});
