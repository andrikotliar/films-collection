export const buildLink = (
  parameter: string,
  value: string | number | Object,
) => {
  const formattedValue =
    typeof value === 'object'
      ? JSON.stringify(value)
      : value;

  const link = `/?${parameter}=${formattedValue}`;

  return link;
};
