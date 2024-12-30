const SPECIAL_CHARACTERS_REGEX = /[^A-Za-z0-9\s-]/g;
const SPACES_REGEX = /[\s-]+/g;

export const formatTitle = (title, fallback) => {
  if (!title) {
    return fallback;
  }

  return title
    .replace(SPECIAL_CHARACTERS_REGEX, '')
    .trim()
    .replace(SPACES_REGEX, '_');
};
