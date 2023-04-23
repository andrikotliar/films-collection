export const getFilterParams = (searchParams) => {
  const filterParams = {};
  searchParams.forEach((value, key) => {
    if(filterParams[key]) {
      filterParams[key] = [filterParams[key], value];
    } else {
      filterParams[key] = value;
    }
  });
  return filterParams;
};