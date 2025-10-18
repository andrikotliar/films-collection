import { isNewItem, type FormValues, type UnknownEntity } from '~/common';

export const getFormTitle = <T extends FormValues<UnknownEntity>>(
  values: T,
  label = 'Item',
  titleKey: keyof T = 'title',
) => {
  if (isNewItem(values.id)) {
    return `Create ${label}`;
  }

  return `Edit ${label}: ${values[titleKey]}`;
};
