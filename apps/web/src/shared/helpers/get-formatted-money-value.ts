const getDivisor = (length: number) => {
  if (length <= 6) {
    return {
      value: 1_000,
      label: 'thousand',
    };
  }

  if (length <= 9) {
    return {
      value: 1_000_000,
      label: 'million',
    };
  }

  return {
    value: 1_000_000_000,
    label: 'billion',
  };
};

export const getFormattedMoneyValue = (value: number | null): string | null => {
  if (!value) {
    return 'N/A';
  }

  const valueLength = value.toString().length;
  const divisor = getDivisor(valueLength);

  const formattedValue = Number(value) / divisor.value;

  return `$${formattedValue} ${divisor.label}`;
};
