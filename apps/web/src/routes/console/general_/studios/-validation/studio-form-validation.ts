import { idSchema, titleSchema } from '~/shared';
import * as yup from 'yup';

export const studioFormValidation = yup.object({
  id: idSchema,
  title: titleSchema,
});
