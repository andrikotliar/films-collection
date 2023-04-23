export const buildLink = (parameter, value) => {
  const link = `/?${parameter}=${value}`;
  return link;
};