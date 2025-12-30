import { CreatePendingFilmInputSchema } from '@films-collection/shared';
import { IdSchema } from '~/shared';

export const PendingFilmFormSchema = CreatePendingFilmInputSchema.extend({
  id: IdSchema,
});
