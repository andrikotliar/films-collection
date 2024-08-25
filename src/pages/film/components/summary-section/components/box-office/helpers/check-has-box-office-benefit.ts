const checkHasBoxOfficeBenefit = (
  budget: number = 0,
  boxOffice: number = 0,
) => {
  if (boxOffice > budget) {
    return true;
  }

  return false;
};

export { checkHasBoxOfficeBenefit };
