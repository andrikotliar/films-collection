export type FormattedValue = {
  value: number;
  shortValue: number;
  order: string;
};

const getFormattedValue = (value?: number): FormattedValue | null => {
  if(!value) return null;

  const valueLength = value.toString().length;

  if(valueLength >= 7 && valueLength <= 9) {
    return {
      value,
      shortValue: value / 1_000_000,
      order: 'million',
    };
  }

  if(valueLength > 9) {
    return {
      value,
      shortValue: value / 1_000_000_000,
      order: 'billion'
    };
  }

  return null;
}

export { getFormattedValue };