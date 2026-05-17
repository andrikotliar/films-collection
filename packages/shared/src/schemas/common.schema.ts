import { z } from 'zod';

export const CommonListQuerySchema = z
  .object({
    q: z.string().trim(),
    pageIndex: z.coerce.number(),
  })
  .partial();

export type CommonListQueryParams = z.infer<typeof CommonListQuerySchema>;
