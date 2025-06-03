import { object, string } from 'yup';

export const baseFormValidation = object({
  title: string().required(),
});
