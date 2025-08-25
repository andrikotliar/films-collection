import { NEW_ITEM_ID } from '@/common';
import type { PersonMutationPayload } from '@/hooks';

export const personDefaultValues: PersonMutationPayload = {
  id: NEW_ITEM_ID,
  name: '',
};
