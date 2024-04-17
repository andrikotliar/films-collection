export const buildQueryLink = (parameter: string, value: string | number) => {
  const link = `/?${parameter}=${value}`;

  return link;
};
