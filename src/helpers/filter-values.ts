import { DynamicObject } from '@/common';

const filterValues = (obj: DynamicObject) => {
  const filteredObject: DynamicObject = {};

  for (const key in obj) {
    if (obj[key]) {
      filteredObject[key] = obj[key];
    }
  }

  return filteredObject;
};

export { filterValues };
