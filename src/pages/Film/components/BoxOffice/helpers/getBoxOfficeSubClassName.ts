export enum SubClassNamesEnum {
  BOX_OFFICE_LOW = 'low',
  BOX_OFFICE_HIGH = 'high',
}

const getBoxOfficeSubClassName = (
  budget: number = 0,
  boxOffice: number = 0,
) => {
  if (boxOffice > budget) {
    return SubClassNamesEnum.BOX_OFFICE_HIGH;
  }

  return SubClassNamesEnum.BOX_OFFICE_LOW;
};

export { getBoxOfficeSubClassName };
