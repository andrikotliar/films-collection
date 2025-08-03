import type { CollectionEvent } from '@/common';

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
] as const;

export const getDateMonthLabel = (data: CollectionEvent) => {
  if (data.startDate === data.endDate) {
    const dateObj = new Date(data.startDate);
    const date = dateObj.getDate();
    const monthIndex = dateObj.getMonth();

    return `${months[monthIndex]}, ${date}`;
  }

  const startDateObj = new Date(data.startDate);
  const endDateObj = new Date(data.endDate);

  const startDate = startDateObj.getDate();
  const startDateMonthIndex = startDateObj.getMonth();
  const endDate = endDateObj.getDate();
  const endDateMonthIndex = endDateObj.getMonth();

  return `${months[startDateMonthIndex]}, ${startDate} - ${months[endDateMonthIndex]}, ${endDate}`;
};
