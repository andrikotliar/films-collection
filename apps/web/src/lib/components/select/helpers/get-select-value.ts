import { type SelectProps } from '~/lib/components/select/select';

export const getSelectValue = (value: SelectProps['value']) => {
  if (Array.isArray(value)) {
    return value;
  }

  if (typeof value === 'string' || typeof value === 'number') {
    return [value];
  }

  return [];
};
