import { getDateCodeParts } from '~/shared';

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

const convertCodeToString = (dateCode: number) => {
  const dateCodeParts = getDateCodeParts(dateCode);
  return `${months[dateCodeParts[0] - 1]}, ${dateCodeParts[1]}`;
};

export const getDateMonthLabel = <T extends { startDateCode: number; endDateCode: number }>(
  data: T,
) => {
  if (data.startDateCode === data.endDateCode) {
    return convertCodeToString(data.startDateCode);
  }

  const startDate = convertCodeToString(data.startDateCode);
  const endDate = convertCodeToString(data.endDateCode);

  return `${startDate} - ${endDate}`;
};
