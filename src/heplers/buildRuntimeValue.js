export const buildRuntimeValue = (durationObj) => {
  const { hours, minutes } = durationObj;
  const result = `${hours} hr ${minutes} min`;
  return result;
};