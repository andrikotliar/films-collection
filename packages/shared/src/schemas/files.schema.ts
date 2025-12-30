import z from 'zod';

export const CreateFileResponseSchema = z.object({
  filePath: z.string(),
});
