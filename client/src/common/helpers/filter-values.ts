export const filterValues = <T extends Record<string, any>>(values: T) => {
  const filteredObject: Partial<T> = {};

  for (const key in values) {
    if (values[key]) {
      filteredObject[key] = values[key];
    }
  }

  return filteredObject;
};
