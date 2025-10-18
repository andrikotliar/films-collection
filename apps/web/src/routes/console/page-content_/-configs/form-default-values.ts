import { NEW_ITEM_ID } from '@/common';
import type { PageContentMutationPayload } from '@/hooks';

export const formDefaultValues: PageContentMutationPayload = {
  id: NEW_ITEM_ID,
  title: '',
  pageKey: '',
  content: '',
};
