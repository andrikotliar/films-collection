import { ListOption } from '../types';

type ListItem = {
  id: number;
  title: string;
  [key: string]: unknown;
};

export const buildListOptions = (list: ListItem[]): ListOption[] => {
  return list.map(({ id, title, ...rest }) => ({
    label: title,
    value: id,
    ...rest,
  }));
};
