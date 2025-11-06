import { idSchema, titleSchema } from '~/lib';
import * as yup from 'yup';

export const countryFormValidation = yup.object({
  id: idSchema,
  title: titleSchema,
});
