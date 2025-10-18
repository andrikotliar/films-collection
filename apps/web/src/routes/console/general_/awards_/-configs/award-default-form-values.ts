import { NEW_ITEM_ID } from '~/common';
import type { AwardMutationPayload } from '~/hooks';

export const awardDefaultFormValues: AwardMutationPayload = {
  id: NEW_ITEM_ID,
  title: '',
  description: null,
  nominations: [],
};
