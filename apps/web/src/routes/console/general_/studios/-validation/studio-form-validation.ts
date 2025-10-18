import { idSchema, titleSchema } from '~/common';
import * as yup from 'yup';

export const studioFormValidation = yup.object({
  id: idSchema,
  title: titleSchema,
});
