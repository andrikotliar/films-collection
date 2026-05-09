import z from 'zod';

export const getListResponseSchema = <T extends z.ZodType>(dataSchema: T) => {
  return z.object({
    list: dataSchema,
    total: z.number(),
    pageLimit: z.number(),
  });
};
