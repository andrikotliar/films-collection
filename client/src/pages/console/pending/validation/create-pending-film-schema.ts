import { object, string } from 'yup';

export const createPendingFilmSchema = object({
  title: string().required().label('Title'),
  priority: string().required().label('Priority'),
});
