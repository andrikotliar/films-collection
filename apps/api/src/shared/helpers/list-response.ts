type ListResponse<T extends Record<string, unknown>> = {
  list: T[];
  total: number;
  pageLimit: number;
};

export const listResponse = <T extends Record<string, unknown>>(data: ListResponse<T>) => {
  return data;
};
