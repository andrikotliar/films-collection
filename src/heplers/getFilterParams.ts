import { UnknownObject } from "@/types";

export const getFilterParams = (searchParams: URLSearchParams) => {
  const filterParams: UnknownObject = {};
  searchParams.forEach((value, key) => {
    if(filterParams[key]) {
      filterParams[key] = [filterParams[key], value];
    } else {
      filterParams[key] = value;
    }
  });
  return filterParams;
};