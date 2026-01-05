import { NEW_ITEM_ID } from '@films-collection/shared';
import type { Entity } from '~/shared/types';

export const getEmptyFormValues = <T extends Record<string, unknown>>(values: T): Entity<T> => {
  return {
    ...values,
    id: NEW_ITEM_ID,
  };
};
