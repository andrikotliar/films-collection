import z from 'zod';

export const CreateChapterKeyInputSchema = z.object({
  key: z.string(),
});

export type CreateChapterKeyInput = z.infer<typeof CreateChapterKeyInputSchema>;
