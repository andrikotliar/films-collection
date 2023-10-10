import { DynamicObject } from '@/types';

const isResetBtnVisible = (filterParams: DynamicObject) => {
  const paramsLength = Object.keys(filterParams).length;

  if (
    (paramsLength === 1 && !filterParams.page) ||
    paramsLength > 1
  ) {
    return true;
  }

  return false;
};

export { isResetBtnVisible };
