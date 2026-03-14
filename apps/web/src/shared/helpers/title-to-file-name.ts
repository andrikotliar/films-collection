export const titleToFileName = (title: string) => {
  const sanitizedString = title.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '_');

  return sanitizedString.toLowerCase();
};
