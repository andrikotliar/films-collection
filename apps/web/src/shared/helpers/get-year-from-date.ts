export const getYearFromDate = (dateString?: string | Date | null) => {
  if (!dateString) {
    return 'N/A';
  }

  if (dateString instanceof Date) {
    return dateString.getFullYear();
  }

  const date = new Date(dateString);

  return date.getFullYear();
};
