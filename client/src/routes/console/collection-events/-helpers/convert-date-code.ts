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
];

export const convertDateCode = (dateCode: number) => {
  const dateCodeDecimal = dateCode / 100;
  const dateParts = dateCodeDecimal.toFixed(2).split('.').map(Number);

  return {
    month: dateParts[0],
    date: dateParts[1],
    label: `${months[dateParts[0] - 1]}, ${dateParts[1]}`,
  };
};
