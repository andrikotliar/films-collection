import { idSchema, titleSchema } from '@/common';
import * as yup from 'yup';

export const genresFormValidation = yup.object({
  id: idSchema,
  title: titleSchema,
});
