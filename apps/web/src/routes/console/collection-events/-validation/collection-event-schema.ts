import { idSchema, titleSchema } from '@/common';
import * as yup from 'yup';

const dateCodeSchema = yup.number().min(101).max(1231).required();

export const collectionEventSchema = yup.object({
  id: idSchema,
  title: titleSchema,
  startDateCode: dateCodeSchema.label('Start Date'),
  endDateCode: dateCodeSchema.label('End Date'),
  collectionId: yup.number().required().label('Collection'),
  yearFrom: yup.number().required().default(0),
  titleFilmId: yup.number().nullable().label('Film ID').defined(),
  isOneDayEvent: yup.boolean().required().default(false),
});
