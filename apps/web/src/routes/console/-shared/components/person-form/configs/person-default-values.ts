import { NEW_ITEM_ID } from '@films-collection/shared';
import type z from 'zod';
import type { PersonFormSchema } from '~/routes/console/-shared/components/person-form/person-form';

export const personDefaultValues: z.infer<typeof PersonFormSchema> = {
  id: NEW_ITEM_ID,
  name: '',
};
