type Values = {
  [key: string]: any;
};

const filterValues = (values: Values) => {
  const filteredObject: Values = {};

  for (const key in values) {
    if (values[key]) {
      filteredObject[key] = values[key];
    }
  }

  return filteredObject;
};

export { filterValues };
