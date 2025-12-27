import z from 'zod';

export const CreatePendingFilmInputSchema = z.object({
  title: z.string(),
  priority: z.number().min(1).max(3),
  collectionId: z.number().min(1).nullable(),
  rating: z.number().min(1).max(3).nullable(),
});

export const GetPendingFilmsListQuerySchema = z
  .object({
    q: z.string(),
    skip: z.number(),
    orderKey: z.string(),
    order: z.string(),
    priorities: z.array(z.number().min(1).max(3)),
  })
  .partial();

export const UpdatePendingFilmInputSchema = CreatePendingFilmInputSchema.partial();

export const PendingFilmResponseSchema = z.object({
  id: z.number(),
  title: z.string(),
  priority: z.number().min(1).max(3),
  rating: z.number().min(1).max(3).nullable(),
  collectionId: z.number().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const PendingFilmsListResponseSchema = z.object({
  list: z.array(PendingFilmResponseSchema),
  total: z.number(),
});

export const PendingFilmByIdResponseSchema = PendingFilmResponseSchema.omit({
  createdAt: true,
  updatedAt: true,
});

export type CreatePendingFilmInput = z.infer<typeof CreatePendingFilmInputSchema>;
export type UpdatePendingFilmInput = z.infer<typeof UpdatePendingFilmInputSchema>;
export type GetPendingFilmsListQuery = z.infer<typeof GetPendingFilmsListQuerySchema>;
