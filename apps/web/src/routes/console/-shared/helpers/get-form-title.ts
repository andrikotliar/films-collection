import { isNewItem, type Entity } from '~/shared';

export const getFormTitle = <T extends Entity>(
  values: T,
  label = 'Item',
  titleKey: keyof T = 'title',
) => {
  if (isNewItem(values.id)) {
    return `Create ${label}`;
  }

  return `Edit ${label}: ${values[titleKey]}`;
};
