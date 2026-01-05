import { CountryInputSchema } from '@films-collection/shared';
import { FormIdParamSchema } from '~/shared';

export const CountryFormSchema = CountryInputSchema.extend({
  id: FormIdParamSchema,
});
