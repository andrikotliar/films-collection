import { idSchema, titleSchema } from '~/lib';
import * as yup from 'yup';

export const awardFormSchema = yup.object({
  id: idSchema,
  title: titleSchema,
  description: yup.string().nullable().defined().label('Description'),
  nominations: yup.array(
    yup.object({
      id: yup.number().required(),
      title: yup.string().required(),
      shouldIncludeActor: yup.boolean().required(),
    }),
  ),
});
