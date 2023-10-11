import { DynamicObject } from '@/common';

const isResetBtnVisible = (filterParams: DynamicObject) => {
  const paramsLength = Object.keys(filterParams).length;

  if (paramsLength) {
    return true;
  }

  return false;
};

export { isResetBtnVisible };
