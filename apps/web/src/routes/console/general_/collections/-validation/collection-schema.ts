import { idSchema, titleSchema } from '~/lib';
import * as yup from 'yup';

export const collectionSchema = yup.object({
  id: idSchema,
  title: titleSchema,
  category: yup.string().required(),
  description: yup.string().nullable().defined(),
});
