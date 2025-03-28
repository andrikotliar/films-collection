import { number, object, string } from 'yup';

export const createPendingFilmSchema = object({
  title: string().required().label('Title'),
  priority: string().required().label('Priority'),
  collectionId: string().nullable().defined().label('Collection'),
  rating: number().nullable().defined().label('Rating'),
});
