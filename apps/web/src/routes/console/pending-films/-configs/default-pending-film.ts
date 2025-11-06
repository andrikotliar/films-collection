import { NEW_ITEM_ID, type PendingFilmMutationPayload } from '~/lib';

export const defaultPendingFilm: PendingFilmMutationPayload = {
  id: NEW_ITEM_ID,
  title: '',
  priority: '1',
  collectionId: null,
  rating: null,
};
