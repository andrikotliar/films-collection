import { idSchema, titleSchema } from '~/shared';
import * as yup from 'yup';

export const countryFormValidation = yup.object({
  id: idSchema,
  title: titleSchema,
});
