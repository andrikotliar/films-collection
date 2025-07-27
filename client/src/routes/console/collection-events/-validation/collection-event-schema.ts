import * as yup from 'yup';

const dateSchema = yup
  .number()
  .required()
  .default(1)
  .min(1)
  .max(31)
  .typeError('Field cannot be empty');
const monthSchema = yup
  .number()
  .required()
  .default(1)
  .min(1)
  .max(12)
  .typeError('Field cannot be empty');

export const collectionEventSchema = yup.object({
  title: yup.string().required().label('Title'),
  startDate: dateSchema.label('Start Date'),
  startMonth: monthSchema.label('Start Month'),
  endDate: dateSchema.label('End Date'),
  endMonth: monthSchema.label('End Month'),
  description: yup.string().defined().nullable(),
  background: yup
    .object({
      angle: yup.string().required().label('Angle'),
      color1: yup.string().required().label('Color 1'),
      color2: yup.string().required().label('Color 2'),
      textColor: yup.string().oneOf(['black', 'white']).required().label('Text Color'),
    })
    .required()
    .label('Background'),
  collectionId: yup.number().required().label('Collection'),
  yearFrom: yup.number().defined().nullable(),
  isOneDayEvent: yup.boolean().required().default(false),
});
