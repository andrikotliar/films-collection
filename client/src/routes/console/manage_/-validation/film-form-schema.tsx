import { titleSchema } from '@/common';
import * as yup from 'yup';

// TODO: extend the form validation
export const filmFormSchema = yup.object({
  title: titleSchema,
});
