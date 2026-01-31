import z from 'zod';

export const CreateFileResponseSchema = z.object({
  url: z.string(),
});
