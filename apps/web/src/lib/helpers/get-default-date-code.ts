import { getDateCode } from '~/lib/helpers/get-date-code';

export const getDefaultDateCode = () => {
  const currentDate = new Date();
  const month = currentDate.getMonth() + 1;
  const date = currentDate.getDate();

  return getDateCode(month, date);
};
