const TARGET_VALUES = {
  min: {
    value: 100_000_000,
    shortValue: 100,
    order: 'million'
  },
  mid: {
    value: 500_000_000,
    shortValue: 500,
    order: 'million'
  },
  max: {
    value: 1_000_000_000,
    shortValue: 1,
    order: 'billion'
  },
};

const getBoxOfficeTargetValue = (boxOffice?: number, budget?: number) => {
  if(boxOffice) {
    if(budget && boxOffice < budget || boxOffice < TARGET_VALUES.mid.value) {
      return TARGET_VALUES.mid;
    }

    if(boxOffice <= TARGET_VALUES.min.value) {
      return TARGET_VALUES.min;
    }
  
    if(boxOffice > TARGET_VALUES.max.value) {
      const nearestBillion = Math.ceil(boxOffice / TARGET_VALUES.max.value);
      const value = nearestBillion * TARGET_VALUES.max.value;
      const shortValue = value / TARGET_VALUES.max.value;
  
      return {
        value,
        shortValue,
        order: 'billion'
      };
    };
  }

  return TARGET_VALUES.max
}

export { getBoxOfficeTargetValue };