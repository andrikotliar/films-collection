import type { ListOption } from '@films-collection/shared';
import { MIN_YEAR } from '~/shared/constants';

export const generateYearsSelectOptions = (): ListOption<number>[] => {
  const yearOptions: ListOption<number>[] = [];
  const currentYear = new Date().getFullYear();

  for (let year = MIN_YEAR; year <= currentYear; year++) {
    yearOptions.push({ label: year.toString(), value: year });
  }

  return yearOptions;
};
