import { NEW_ITEM_ID, type PageContentMutationPayload } from '~/shared';

export const formDefaultValues: PageContentMutationPayload = {
  id: NEW_ITEM_ID,
  title: '',
  pageKey: '',
  content: '',
};
