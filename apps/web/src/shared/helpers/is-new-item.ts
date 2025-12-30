import { NEW_ITEM_ID } from '@films-collection/shared';
import { type MixedId } from '~/shared';

export const isNewItem = (id: MixedId | string): id is typeof NEW_ITEM_ID => {
  return id === NEW_ITEM_ID;
};
