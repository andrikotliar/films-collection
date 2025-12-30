import type { ListOption } from '@films-collection/shared';

type Value = {
  title: string;
  id: number;
};

export const getListOptions = (values: (Value | string)[]): ListOption<unknown>[] => {
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
