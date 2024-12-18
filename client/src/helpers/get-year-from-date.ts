export const getYearFromDate = (dateString?: string) => {
  if (!dateString) {
    return 'N/A';
  }

  const date = new Date(dateString);

  return date.getFullYear();
};
