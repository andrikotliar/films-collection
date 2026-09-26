import { NEW_ITEM_ID } from '@hobbies-collection/shared';
import type { api, Input } from '~/shared';

export const getDefaultHobbyItem = (): Input<typeof api.hobbies.createHobbyItem> & {
  id: typeof NEW_ITEM_ID;
} => ({
  id: NEW_ITEM_ID,
  title: '',
  description: '',
  releaseYear: new Date().getFullYear(),
  collections: [],
  people: [],
});
