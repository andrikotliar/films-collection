export const nullable = <T>(value: T | undefined | null) => {
  if (value === null || value === undefined) {
    return null;
  }

  return value;
};
