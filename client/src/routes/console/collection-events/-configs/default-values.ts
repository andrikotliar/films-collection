import { NEW_ITEM_ID } from '@/common';
import type { CollectionEventMutationPayload } from '@/hooks';

export const getDefaultValues = (): CollectionEventMutationPayload => {
  const now = new Date();
  const month = now.getMonth() + 1;
  const date = now.getDate();

  return {
    id: NEW_ITEM_ID,
    title: '',
    collectionId: 0,
    startDate: `2000-${month.toString().padStart(2, '0')}-${date.toString().padStart(2, '0')}`,
    endDate: `2000-${month.toString().padStart(2, '0')}-${date.toString().padStart(2, '0')}`,
    yearFrom: 0,
    isOneDayEvent: false,
    titleFilmId: null,
  };
};
