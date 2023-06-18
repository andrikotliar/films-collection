export enum SubClassNamesEnum {
  BOX_OFFICE_LOW = 'box-office-low',
  BOX_OFFICE_HIGH = 'box-office-high',
};

const getMoneySubClassName = (
  budget?: number,
  boxOffice?: number
) => {
  if(budget && boxOffice && boxOffice > budget) {
    return SubClassNamesEnum.BOX_OFFICE_HIGH;
  }

  return SubClassNamesEnum.BOX_OFFICE_LOW;
};

export { getMoneySubClassName };