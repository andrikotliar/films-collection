import { array, boolean, mixed, number, object, string } from 'yup';

export const awardFormSchema = object({
  title: string().required().label('Title'),
  description: string().nullable().defined().label('Description'),
  image: mixed().required().label('Image'),
  nominations: array(
    object({
      id: number().required(),
      title: string().required(),
      shouldIncludeActor: boolean().required(),
    }),
  ),
});
