import { PAGE_LIMITS } from '~/constants';

export const getSkipValue = (param: keyof typeof PAGE_LIMITS, index: number = 0) => {
  return (index + 1) * PAGE_LIMITS[param];
};
