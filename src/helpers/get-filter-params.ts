import { DynamicObject } from '@/types';

export const getFilterParams = (
  searchParams: URLSearchParams,
) => {
  const filterParams: DynamicObject = {};
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
