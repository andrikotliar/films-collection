import type { CollectionEvent } from '@/common';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;

export const getDateMonthLabel = (data: CollectionEvent) => {
  if (data.startDate === data.endDate && data.startMonth === data.endMonth) {
    return `${months[data.startMonth - 1]}, ${data.startDate}`;
  }

  return `${months[data.startMonth - 1]}, ${data.startDate} - ${months[data.endMonth - 1]}, ${data.endDate}`;
};
