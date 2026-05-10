export const getDateCodeParts = (dateCode: number): number[] => {
  const month = Math.floor(dateCode / 100);
  const day = dateCode % 100;

  return [month, day];
};
