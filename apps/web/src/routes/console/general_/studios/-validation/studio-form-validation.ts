import { idSchema, titleSchema } from '~/lib';
import * as yup from 'yup';

export const studioFormValidation = yup.object({
  id: idSchema,
  title: titleSchema,
});
