import { StudioInputSchema } from '@films-collection/shared';
import { IdSchema } from '~/shared';

export const StudioFormSchema = StudioInputSchema.extend({
  id: IdSchema,
});
