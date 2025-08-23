import { idSchema, titleSchema } from '@/common';
import * as yup from 'yup';

export const collectionEventSchema = yup.object({
  id: idSchema,
  title: titleSchema,
  startDate: yup
    .string()
    .label('Start Date')
    .required()
    .test({
      name: 'is-before-end-date',
      message: 'Start Date must be before the end date',
      test(startDate) {
        if (!startDate || !this.parent.endDate || this.parent.isOneDayEvent) {
          return true;
        }

        const startDateTime = new Date(startDate).getTime();
        const endDateTime = new Date(this.parent.endDate).getTime();

        return startDateTime <= endDateTime;
      },
    }),
  endDate: yup
    .string()
    .label('End Date')
    .required()
    .test({
      name: 'is-after-start-date',
      message: 'End Date must be after the start date',
      test(endDate) {
        if (!this.parent.startDate || !endDate || this.parent.isOneDayEvent) {
          return true;
        }

        const startDateTime = new Date(this.parent.startDate as unknown as string).getTime();
        const endDateTime = new Date(endDate).getTime();

        return endDateTime >= startDateTime;
      },
    }),
  collectionId: yup.number().required().label('Collection'),
  yearFrom: yup.number().required().default(0),
  titleFilmId: yup.number().nullable().label('Film ID').defined(),
  isOneDayEvent: yup.boolean().required().default(false),
});
