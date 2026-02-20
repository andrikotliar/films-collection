import z from 'zod';

export const CreateChapterKeyInputSchema = z.object({
  key: z.string().regex(/^[a-z-]+$/),
});

export const ChapterKeyResponseSchema = z.object({
  key: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type CreateChapterKeyInput = z.infer<typeof CreateChapterKeyInputSchema>;
