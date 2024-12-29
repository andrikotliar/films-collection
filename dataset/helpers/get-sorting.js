export const getSorting = (sortBy, sortOrder) => {
  if (!sortBy) {
    return {};
  }

  return {
    [sortBy]: sortOrder === 'asc' ? 1 : -1,
  };
};
