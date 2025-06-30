import { mixed, number, object, string } from 'yup';

export const collectionEventSchema = object({
  title: string().required(),
  image: mixed().required(),
  startDate: number().required(),
  startMonth: number().required(),
  endDate: number().required(),
  endMonth: number().required(),
  description: string().defined().nullable(),
  background: string().required(),
  collectionId: number().required(),
});
