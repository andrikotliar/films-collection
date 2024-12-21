type Query = {
  [param: string]: string | number | object;
};

const baseQueryParams = {
  pageIndex: 0,
};

export const buildQueryLink = (query: Query) => {
  const localQuery = { ...baseQueryParams, ...query };

  const queryStrings = Object.entries(localQuery).map(([param, value]) => {
    const formattedValue =
      typeof value === 'object' ? JSON.stringify(value) : value;

    return `${param}=${formattedValue}`;
  });

  const queryLink = queryStrings.join('&');

  return `/?${queryLink}`;
};
