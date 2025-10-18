import { NEW_ITEM_ID } from '@/common';
import type { CollectionMutationPayload } from '@/hooks';

export const collectionFormDefaultValues: CollectionMutationPayload = {
  id: NEW_ITEM_ID,
  title: '',
  category: '',
  description: null,
};
