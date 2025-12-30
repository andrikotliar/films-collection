import { CreatePageContentInputSchema } from '@films-collection/shared';
import { IdSchema } from '~/shared';

export const PageContentFormSchema = CreatePageContentInputSchema.extend({
  id: IdSchema,
});
