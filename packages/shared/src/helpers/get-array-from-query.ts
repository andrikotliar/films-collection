import z from 'zod';

export const getArrayFromQuery = <T extends z.ZodType<any, any>>(item: T) =>
  z
    .string()
    .or(z.array(z.string()))
    .or(z.array(z.number()))
    .transform((v) => (Array.isArray(v) ? v : [v]))
    .pipe(z.array(item));
