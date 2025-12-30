import { NEW_ITEM_ID } from '@films-collection/shared';

export const getEmptyFormValues = <T extends Record<string, unknown>>(
  values: T,
): T & {
  id: typeof NEW_ITEM_ID;
} => {
  return {
    ...values,
    id: NEW_ITEM_ID,
  };
};
