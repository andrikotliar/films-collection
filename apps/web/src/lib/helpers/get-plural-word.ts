export const getPluralWord = (
  singularWord: string,
  counter = 1,
  pluralVariant?: string,
) => {
  if (counter === 1) {
    return singularWord;
  }

  if (pluralVariant) {
    return pluralVariant;
  }

  return `${singularWord}s`;
};
