import { CreateArticleSchema } from '@films-collection/shared';
import { FormIdParamSchema } from '~/shared';

export const ArticleFormSchema = CreateArticleSchema.extend({
  id: FormIdParamSchema,
});
