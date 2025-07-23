import type { CollectionEvent } from '@/common';

export const isOneDayEvent = (event: CollectionEvent): boolean => {
  return (
    event.startDate === event.endDate && event.startMonth === event.endMonth
  );
};
