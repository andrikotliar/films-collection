import { NEW_ITEM_ID } from '@hobbies-collection/shared';

export const defineDefaultValues = (values: any) => {
  return {
    ...values,
    id: NEW_ITEM_ID,
  };
};
