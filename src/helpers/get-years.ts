export const getYears = () => {
  const startYear = 1977;
  const currentYear = new Date().getFullYear();
  const years: number[] = [];

  for (let year = currentYear; year >= startYear; year--) {
    years.push(year);
  }

  return years;
};
