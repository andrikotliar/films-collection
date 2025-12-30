import { PAGE_LIMITS } from '~/constants';

export const getSkipValue = (param: keyof typeof PAGE_LIMITS, index: number = 0) => {
  return index * PAGE_LIMITS[param];
};
