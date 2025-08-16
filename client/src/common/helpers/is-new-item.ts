import { NEW_ITEM_ID } from '@/common';

export const isNewItem = (id: number | typeof NEW_ITEM_ID): id is typeof NEW_ITEM_ID => {
  return id === NEW_ITEM_ID;
};
