type ListResponse<T> = {
  list: T;
  total: number;
  pageLimit: number;
};

export const listResponse = <T>(data: ListResponse<T>) => {
  return data;
};
