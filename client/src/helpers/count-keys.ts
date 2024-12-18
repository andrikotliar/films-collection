export const countObjectKeys = (
  params: { [key: string]: any },
  filterKeys?: string[],
) => {
  const keys = Object.keys(params);

  if (filterKeys) {
    const filteredKeys = keys.filter((key) => !filterKeys.includes(key));
    return filteredKeys.length;
  }

  return keys.length;
};
