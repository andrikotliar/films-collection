import { NEW_ITEM_ID, type MixedId } from '~/lib';

export const isNewItem = (id: MixedId | string): id is typeof NEW_ITEM_ID => {
  return id === NEW_ITEM_ID;
};
