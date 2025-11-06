import { idSchema, titleSchema } from '~/lib';
import * as yup from 'yup';

export const genresFormValidation = yup.object({
  id: idSchema,
  title: titleSchema,
});
