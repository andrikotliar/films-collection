export const getBoxOffiseStatus = (budget, boxoffice) => {
  const hasBillion = boxoffice.suffix === "billion";
  if (boxoffice.value > budget.value || hasBillion) {
    return "details-item__success";
  }

  return "details-item__failure";
};