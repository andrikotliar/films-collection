import { NEW_ITEM_ID } from '@films-collection/shared';
import type z from 'zod';
import type { CountryFormSchema } from '~/routes/console/general_/countries/-components';

export const countryDefaultValues: z.infer<typeof CountryFormSchema> = {
  id: NEW_ITEM_ID,
  title: '',
};
