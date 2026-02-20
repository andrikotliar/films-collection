import z from 'zod';

export const StudioInputSchema = z.object({
  title: z.string(),
});

export const StudioResponseSchema = z.object({
  id: z.coerce.number(),
  title: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const StudiosResponseSchema = z.array(
  StudioResponseSchema.omit({ createdAt: true, updatedAt: true }),
);

export type StudioInput = z.infer<typeof StudioInputSchema>;
