import { DynamicObject } from '@/common';

const hasFiltersLength = (filterParams: DynamicObject) => {
  const paramsLength = Object.keys(filterParams).length;

  if (paramsLength) {
    return true;
  }

  return false;
};

export { hasFiltersLength };
