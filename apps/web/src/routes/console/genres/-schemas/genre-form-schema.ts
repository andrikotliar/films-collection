import { GenreInputSchema } from '@hobbies-collection/shared';
import { FormIdParamSchema } from '~/shared';

export const GenreFormSchema = GenreInputSchema.extend({
  id: FormIdParamSchema,
});
