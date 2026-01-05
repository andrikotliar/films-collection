import { CreatePendingFilmInputSchema } from '@films-collection/shared';
import { FormIdParamSchema } from '~/shared';

export const PendingFilmFormSchema = CreatePendingFilmInputSchema.extend({
  id: FormIdParamSchema,
});
