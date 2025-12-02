export const kebabToCamelCase = (str: string) => {
  return str.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
};
