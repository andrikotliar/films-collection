import { isNewItem, type FormValues, type UnknownEntity } from '@/common';

type FormTitleParams<T extends FormValues<UnknownEntity>> = {
  values: T;
  newItemTitle: string;
  existingItemTitle: string;
};

export const getTitlePlaceholder = <T extends FormValues<UnknownEntity>>(values: T) => {
  if ('title' in values) {
    return values.title as string;
  }

  if ('name' in values) {
    return values.name as string;
  }

  return 'Unknown';
};

export const getFormTitle = <T extends FormValues<UnknownEntity>>({
  values,
  newItemTitle,
  existingItemTitle,
}: FormTitleParams<T>) => {
  if (isNewItem(values.id)) {
    return newItemTitle;
  }

  const placeholder = getTitlePlaceholder(values);
  return existingItemTitle.replace('{}', placeholder);
};
