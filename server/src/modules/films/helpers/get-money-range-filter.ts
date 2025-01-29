const MONEY_RANGE_MILLIONS = 10_000_000;

export const getMoneyRangeFilter = (value: number) => {
  if (value < MONEY_RANGE_MILLIONS) {
    return {
      lte: value + MONEY_RANGE_MILLIONS,
      gte: 0,
    };
  }

  return {
    lte: value + MONEY_RANGE_MILLIONS,
    gte: value - MONEY_RANGE_MILLIONS,
  };
};
