import { NEW_ITEM_ID } from '@/common';
import type { AwardFormValues } from '@/routes/console/general_/awards_/-types';

export const awardDefaultFormValues: AwardFormValues = {
  id: NEW_ITEM_ID,
  title: '',
  description: null,
  nominations: [],
};
