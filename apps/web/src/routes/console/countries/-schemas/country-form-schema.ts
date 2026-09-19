import { CountryInputSchema } from '@hobbies-collection/shared';
import { FormIdParamSchema } from '~/shared';

export const CountryFormSchema = CountryInputSchema.extend({
  id: FormIdParamSchema,
});
