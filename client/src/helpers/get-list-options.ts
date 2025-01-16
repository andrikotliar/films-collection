import { ListOption } from '@/types';

type Value = {
  title: string;
  id: string;
};

export const getListOptions = (values: (Value | string)[]): ListOption[] => {
  return values.map((value) => {
    if (typeof value === 'string') {
      return {
        label: value,
        value,
      };
    }

    return {
      label: value.title,
      value: value.id,
    };
  });
};
