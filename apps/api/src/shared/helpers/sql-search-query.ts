export const sqlSearchQuery = (value: string) => {
  return `%${value.trim()}%`;
};
