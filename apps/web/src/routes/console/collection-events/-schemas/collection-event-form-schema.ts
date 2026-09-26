import { CreateCollectionEventInputSchema } from '@hobbies-collection/shared';
import { z } from 'zod';
import { FormIdParamSchema } from '~/shared';

export const CollectionEventFormSchema = CreateCollectionEventInputSchema.extend({
  id: FormIdParamSchema,
  isOneDayEvent: z.boolean(),
});
