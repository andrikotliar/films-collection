import createConfig from '@films-collection/eslint-config';

export default createConfig({
  languageOptions: {
    parserOptions: {
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
