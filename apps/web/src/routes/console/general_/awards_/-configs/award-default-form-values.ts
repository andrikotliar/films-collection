import { NEW_ITEM_ID, type AwardMutationPayload } from '~/shared';

export const awardDefaultFormValues: AwardMutationPayload = {
  id: NEW_ITEM_ID,
  title: '',
  description: null,
  nominations: [],
};
