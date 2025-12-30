import { IdSchema } from '~/shared';
import { GenreInputSchema } from '@films-collection/shared';

export const GenreFormSchema = GenreInputSchema.extend({
  id: IdSchema,
});
