const buildQueryLink = (parameter: string, value: string | number | object) => {
  const formattedValue =
    typeof value === 'object' ? JSON.stringify(value) : value;

  const link = `/?${parameter}=${formattedValue}`;

  return link;
};

export { buildQueryLink };
