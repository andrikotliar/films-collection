import { CreateArticleSchema } from '@hobbies-collection/shared';
import { FormIdParamSchema } from '~/shared';

export const ArticleFormSchema = CreateArticleSchema.extend({
  id: FormIdParamSchema,
});
