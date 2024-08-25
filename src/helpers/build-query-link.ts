type Query = {
  [param: string]: string | number | object;
};

const buildQueryLink = (query: Query) => {
  const queryStrings = Object.entries(query).map(([param, value]) => {
    const formattedValue =
      typeof value === 'object' ? JSON.stringify(value) : value;

    return `${param}=${formattedValue}`;
  });

  const queryLink = queryStrings.join('&');

  return `/?${queryLink}`;
};

export { buildQueryLink };
