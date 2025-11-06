import { idSchema } from '~/lib';
import * as yup from 'yup';

export const personSchema = yup.object({
  id: idSchema,
  name: yup.string().required().label('Person name'),
});
