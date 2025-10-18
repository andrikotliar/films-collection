import { idSchema } from '@/common';
import * as yup from 'yup';

export const personSchema = yup.object({
  id: idSchema,
  name: yup.string().required().label('Person name'),
});
