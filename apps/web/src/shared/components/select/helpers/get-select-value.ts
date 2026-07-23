import type { ListOption } from '@films-collection/shared';
import { type SelectProps } from '~/shared/components/select/select';

export const getSelectValue = <T extends ListOption<any>>(value: SelectProps<T>['value']) => {
  if (Array.isArray(value)) {
    return value;
  }

  if (typeof value === 'string' || typeof value === 'number') {
    return [value];
  }

  return [];
};
