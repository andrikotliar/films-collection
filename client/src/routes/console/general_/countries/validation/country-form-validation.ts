import { idSchema, titleSchema } from '@/common';
import * as yup from 'yup';

export const countryFormValidation = yup.object({
  id: idSchema,
  title: titleSchema,
});
