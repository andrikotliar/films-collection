import { CreatePageContentInputSchema } from '@films-collection/shared';
import { FormIdParamSchema } from '~/shared';

export const PageContentFormSchema = CreatePageContentInputSchema.extend({
  id: FormIdParamSchema,
});
