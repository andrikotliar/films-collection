import z from 'zod';

export const StudioInputSchema = z.object({
  title: z.string(),
});

export type StudioInput = z.infer<typeof StudioInputSchema>;
