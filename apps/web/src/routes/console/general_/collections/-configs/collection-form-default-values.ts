import { NEW_ITEM_ID, type CollectionMutationPayload } from '~/shared';

export const collectionFormDefaultValues: CollectionMutationPayload = {
  id: NEW_ITEM_ID,
  title: '',
  category: '',
  description: null,
};
