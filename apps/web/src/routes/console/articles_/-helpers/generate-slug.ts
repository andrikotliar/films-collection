export const generateSlug = (title: string, currentSlug: string) => {
  if (currentSlug.length >= 5) {
    return currentSlug;
  }
  return title
    .toLowerCase()
    .replace(/[^a-zA-Z0-9\s-]/g, '')
    .replace(/[\s-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};
