import { idSchema, titleSchema } from '@/common';
import * as yup from 'yup';

export const pendingFilmSchema = yup.object({
  id: idSchema,
  title: titleSchema,
  priority: yup.string().required().label('Priority'),
  collectionId: yup.number().nullable().defined().label('Collection'),
  rating: yup.number().nullable().defined().label('Rating'),
});
