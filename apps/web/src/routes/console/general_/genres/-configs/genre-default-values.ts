import { NEW_ITEM_ID } from '~/common';
import type { GenreMutationPayload } from '~/hooks';

export const genreDefaultValues: GenreMutationPayload = {
  id: NEW_ITEM_ID,
  title: '',
};
