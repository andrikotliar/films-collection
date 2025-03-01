export const convertEnumValueToLabel = (value: string) => {
  return value
    .split('_')
    .map((str) => str.charAt(0) + str.slice(1).toLowerCase())
    .join(' ');
};
