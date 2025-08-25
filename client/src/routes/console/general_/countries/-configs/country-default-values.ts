import { NEW_ITEM_ID } from '@/common';
import type { CountryMutationPayload } from '@/hooks';

export const countryDefaultValues: CountryMutationPayload = {
  id: NEW_ITEM_ID,
  title: '',
};
