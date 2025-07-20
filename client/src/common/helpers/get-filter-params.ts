export const getFilterParams = (searchParams: URLSearchParams) => {
  const filterParams: { [key: string]: any } = {};
  searchParams.forEach((value, key) => {
    if (filterParams[key]) {
      if (Array.isArray(filterParams[key])) {
        filterParams[key] = [...filterParams[key], value];
      } else {
        filterParams[key] = [filterParams[key], value];
      }
    } else {
      filterParams[key] = value;
    }
  });
  return filterParams;
};
