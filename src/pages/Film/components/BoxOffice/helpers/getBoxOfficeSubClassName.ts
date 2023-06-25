export enum SubClassNamesEnum {
  BOX_OFFICE_LOW = 'box-office-low',
  BOX_OFFICE_HIGH = 'box-office-high',
};

const getBoxOfficeSubClassName = (
  budget: number = 0,
  boxOffice: number = 0
) => {
  if(boxOffice > budget) {
    return SubClassNamesEnum.BOX_OFFICE_HIGH;
  }

  return SubClassNamesEnum.BOX_OFFICE_LOW;
};

export { getBoxOfficeSubClassName };