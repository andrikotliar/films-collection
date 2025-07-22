import { BLUE_DEFAULT, GREEN_DEFAULT } from '@/common';
import type { FormValues } from '@/routes/console/collection-events/-types';

export const defaultValues: FormValues = {
  title: '',
  description: null,
  collectionId: 0,
  background: {
    angle: '45',
    color1: BLUE_DEFAULT,
    color2: GREEN_DEFAULT,
  },
  startDate: 1,
  startMonth: 1,
  endDate: 2,
  endMonth: 2,
  yearFrom: null,
  isOneDayEvent: false,
};
