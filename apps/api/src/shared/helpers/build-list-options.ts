import type { ListOption } from '@films-collection/shared';

type ListItem = {
  id: number;
  title: string;
  [key: string]: unknown;
};

export const buildListOptions = <T extends ListItem>(
  list: T[],
): Array<ListOption & Omit<T, 'id' | 'title'>> => {
  return list.map(({ id, title, ...rest }) => ({
    label: title,
    value: id,
    ...rest,
  }));
};
