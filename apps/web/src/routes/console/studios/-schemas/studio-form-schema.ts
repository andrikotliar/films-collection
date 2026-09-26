import { StudioInputSchema } from '@hobbies-collection/shared';
import { FormIdParamSchema } from '~/shared';

export const StudioFormSchema = StudioInputSchema.extend({
  id: FormIdParamSchema,
});
