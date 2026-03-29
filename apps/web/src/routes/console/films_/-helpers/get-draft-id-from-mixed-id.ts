import { NEW_FILM_DRAFT_ID } from '@films-collection/shared';
import { isNewItem, type MixedId } from '~/shared';

export const getDraftIdFromMixedId = (id: string | MixedId): number => {
  if (isNewItem(id)) {
    return NEW_FILM_DRAFT_ID;
  }

  return Number(id);
};
