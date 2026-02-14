const searchWordsRegex = /\b(actor|actress|acting)\b/i;

export const autoDetectShouldIncludeActor = (title: string) => {
  return searchWordsRegex.test(title);
};
