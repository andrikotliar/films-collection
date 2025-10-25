import { NEW_ITEM_ID, type AwardMutationPayload } from '~/common';

export const awardDefaultFormValues: AwardMutationPayload = {
  id: NEW_ITEM_ID,
  title: '',
  description: null,
  nominations: [],
};
