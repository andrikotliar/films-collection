export const getYearFromDate = (dateString?: string | Date) => {
  if (dateString instanceof Date) {
    return dateString.getFullYear();
  }

  if (!dateString) {
    return 'N/A';
  }

  const date = new Date(dateString);

  return date.getFullYear();
};
