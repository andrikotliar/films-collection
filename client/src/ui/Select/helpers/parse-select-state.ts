export const parseSelectState = (state: { [key: string]: boolean }) => {
  return Object.entries(state)
    .filter(([_, value]) => value)
    .map(([key]) => key);
};
