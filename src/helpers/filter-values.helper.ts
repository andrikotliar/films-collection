const filterValues = (values: { [key: string]: any }) => {
  const filteredObject: { [key: string]: any } = {};

  for (const key in values) {
    if (values[key]) {
      filteredObject[key] = values[key];
    }
  }

  return filteredObject;
};

export { filterValues };
