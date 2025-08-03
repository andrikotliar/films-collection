import type { FormValues } from '@/routes/console/collection-events/-types';

export const getDefaultValues = (): FormValues => {
  const now = new Date();
  const month = now.getMonth() + 1;
  const date = now.getDate();

  return {
    title: '',
    collectionId: null,
    startDate: `2000-${month.toString().padStart(2, '0')}-${date.toString().padStart(2, '0')}`,
    endDate: `2000-${month.toString().padStart(2, '0')}-${date.toString().padStart(2, '0')}`,
    yearFrom: 0,
    isOneDayEvent: false,
    titleFilmId: null,
  };
};
