import { idSchema, titleSchema } from '~/shared';
import * as yup from 'yup';

export const genresFormValidation = yup.object({
  id: idSchema,
  title: titleSchema,
});
