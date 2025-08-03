import * as yup from 'yup';

export const collectionEventSchema = yup.object({
  title: yup.string().required().label('Title'),
  startDate: yup.string().label('Start Date').required(),
  endDate: yup.string().label('End Date').required(),
  collectionId: yup.number().required().label('Collection').nullable(),
  yearFrom: yup.number().required().default(0),
  titleFilmId: yup.number().nullable().label('Film ID').defined(),
  isOneDayEvent: yup.boolean().required().default(false),
});
