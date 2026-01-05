import { StudioInputSchema } from '@films-collection/shared';
import { FormIdParamSchema } from '~/shared';

export const StudioFormSchema = StudioInputSchema.extend({
  id: FormIdParamSchema,
});
