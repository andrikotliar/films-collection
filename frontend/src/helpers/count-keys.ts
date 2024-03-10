import { DynamicObject } from '@/common';

const countObjectKeys = (obj: DynamicObject, filterKeys?: string[]) => {
  const keys = Object.keys(obj);

  if (filterKeys) {
    const filteredKeys = keys.filter((key) => !filterKeys.includes(key));
    return filteredKeys.length;
  }

  return keys.length;
};

export { countObjectKeys };
