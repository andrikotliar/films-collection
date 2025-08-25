import { type SelectProps } from '@/components/select/select';

export const getValue = (value: SelectProps['value']) => {
  if (Array.isArray(value)) {
    return value;
  }

  if (typeof value === 'string' || typeof value === 'number') {
    return [value];
  }

  return [];
};
