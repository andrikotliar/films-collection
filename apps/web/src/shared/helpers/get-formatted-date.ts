type Options = {
  hideYear: boolean;
};

export const getFormattedDate = (
  value?: string | null,
  options?: Partial<Options>,
): string | null => {
  if (!value) {
    return null;
  }

  const date = new Date(value);

  const formattedDate = date.toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  if (options?.hideYear) {
    return formattedDate.split(',')[0];
  }

  return formattedDate;
};
