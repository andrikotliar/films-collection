export const buildLink = (parameter: string, value: any) => {
  const link = `/?${parameter}=${value}`;
  return link;
};