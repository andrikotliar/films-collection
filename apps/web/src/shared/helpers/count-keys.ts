export const countObjectKeys = <T extends Record<string, any>>(
  params: T,
  filterKeys?: (keyof T)[],
) => {
  const keys = Object.keys(params);

  if (filterKeys) {
    const filteredKeys = keys.filter((key) => !filterKeys.includes(key));
    return filteredKeys.length;
  }

  return keys.length;
};
