import { titleSchema } from '~/shared';
import * as yup from 'yup';

// TODO: extend the form validation
export const filmFormSchema = yup.object({
  title: titleSchema,
});
