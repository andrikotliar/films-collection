export const getDateCodeParts = (dateCode: number): number[] => {
  const floatDateCode = dateCode / 100;
  const dateCodeParts = floatDateCode.toString().split('.').map(Number);

  return dateCodeParts;
};
