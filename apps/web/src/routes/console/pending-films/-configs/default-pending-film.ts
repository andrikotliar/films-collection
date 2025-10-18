import { NEW_ITEM_ID } from '~/common';
import type { PendingFilmMutationPayload } from '~/hooks';

export const defaultPendingFilm: PendingFilmMutationPayload = {
  id: NEW_ITEM_ID,
  title: '',
  priority: '1',
  collectionId: null,
  rating: null,
};
