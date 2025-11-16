import { idSchema } from '~/shared';
import * as yup from 'yup';

export const personSchema = yup.object({
  id: idSchema,
  name: yup.string().required().label('Person name'),
});
