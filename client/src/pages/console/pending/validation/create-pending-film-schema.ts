import { number, object, string } from 'yup';

export const createPendingFilmSchema = object({
  title: string().required().label('Title'),
  priority: object({
    label: string().required(),
    value: number().positive().min(1).max(3).required(),
  })
    .required()
    .label('Priority'),
});
