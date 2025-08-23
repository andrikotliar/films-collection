import { isNewItem, type MixedId } from '@/common';

type FormTitleParams = {
  id: MixedId;
  value: string;
  label?: string;
};

export const getFormTitle = ({ id, value, label = 'Item' }: FormTitleParams) => {
  if (isNewItem(id)) {
    return `Create ${label}`;
  }

  return `Edit ${label}: ${value}`;
};
