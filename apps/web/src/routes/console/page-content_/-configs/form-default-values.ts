import { NEW_ITEM_ID, type PageContentMutationPayload } from '~/lib';

export const formDefaultValues: PageContentMutationPayload = {
  id: NEW_ITEM_ID,
  title: '',
  pageKey: '',
  content: '',
};
