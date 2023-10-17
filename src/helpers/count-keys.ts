import { DynamicObject } from '@/common';

const countObjectKeys = (obj: DynamicObject) => {
  return Object.keys(obj).length;
};

export { countObjectKeys };
