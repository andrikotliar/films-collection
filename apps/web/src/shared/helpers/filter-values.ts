export const filterValues = <T extends Record<string, any>>(values: T) => {
  const filteredObject: Partial<T> = {};

  for (const key in values) {
    if (values[key] === 'all' || values[key] === -1) {
      continue;
    }

    if (
      (Array.isArray(values[key]) && values[key].length) ||
      (typeof values[key] === 'string' && values[key].length) ||
      typeof values[key] === 'number'
    ) {
      filteredObject[key] = values[key];
    }
  }

  return filteredObject;
};
