export const getFormattedDate = (value?: string): string | null => {
  if (!value) {
    return null;
  }

  const date = new Date(value);

  const formattedDate = date.toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return formattedDate;
};
