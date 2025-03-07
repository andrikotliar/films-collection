export const checkHasBoxOfficeBenefit = (budget: number, boxOffice: number) => {
  if (boxOffice > budget) {
    return true;
  }

  return false;
};
