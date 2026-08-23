import { HobbyMutationSchema } from '@films-collection/shared';
import { FormIdParamSchema } from '~/shared';

export const HobbyFormSchema = HobbyMutationSchema.extend({
  id: FormIdParamSchema,
});
