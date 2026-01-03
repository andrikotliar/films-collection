import { NEW_ITEM_ID } from '@films-collection/shared';
import type z from 'zod';
import type { CollectionFormSchema } from '~/routes/console/collections/-components';

export const collectionFormDefaultValues: z.infer<typeof CollectionFormSchema> = {
  id: NEW_ITEM_ID,
  title: '',
  category: 'GENERAL',
};
