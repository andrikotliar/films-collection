export const getArrayFilter = (values: number[]) => {
  return {
    every: {
      filmId: {
        in: values,
      },
    },
  };
};
