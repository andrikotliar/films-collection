export const buildMoneyValue = (moneyObj) => {
  const { value, suffix } = moneyObj;
  const result = `$${value} ${suffix}`;
  return result;
};