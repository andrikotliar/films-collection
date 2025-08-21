import type { MixedId } from '@/common';
import * as yup from 'yup';

export const personSchema = yup.object({
  id: yup.mixed<MixedId>().required(),
  name: yup.string().required().label('Person name'),
});
