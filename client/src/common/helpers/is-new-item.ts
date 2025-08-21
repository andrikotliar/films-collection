import { NEW_ITEM_ID, type MixedId } from '@/common';

export const isNewItem = (id: MixedId): id is typeof NEW_ITEM_ID => {
  return id === NEW_ITEM_ID;
};
