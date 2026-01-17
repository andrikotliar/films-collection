export const getTodayString = () => {
  const dateObj = new Date();

  const dayString = dateObj.getDate().toString().padStart(2, '0');
  const month = dateObj.getMonth() + 1;
  const monthString = month.toString().padStart(2, '0');

  const res = `${dateObj.getFullYear()}-${monthString}-${dayString}`;

  return res;
};
