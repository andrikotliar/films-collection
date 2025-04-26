import { mixed, object, string } from 'yup';

export const createPersonSchema = object({
  name: string().required().label('Person name'),
  image: mixed().defined().nullable().label('Photo'),
});
