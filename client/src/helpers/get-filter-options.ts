import { FilterOption } from '@/types';

type Value = {
  title: string;
  id: string;
};

export const getFilterOptions = (
  values: (Value | string)[],
): FilterOption[] => {
  return values.map((value) => {
    if (typeof value === 'string') {
      return {
        title: value,
        filter: value,
      };
    }

    return {
      title: value.title,
      filter: value.id,
    };
  });
};
