import { object, string } from 'yup';

export const createCollectionSchema = object({
  title: string().required(),
  category: string().required(),
  description: string().nullable().defined(),
});
