import { mixed, number, object, string } from 'yup';

const dateSchema = object({
  month: number().required().min(1).max(12),
  date: number().required().min(1).max(31),
});

export const collectionEventSchema = object({
  title: string().required(),
  image: mixed().required(),
  startDate: dateSchema.required(),
  endDate: dateSchema.required(),
  collectionId: number().required(),
});
