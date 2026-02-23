import z from 'zod';
import { getArrayFromQuery } from '~/helpers';

export const CreatePendingFilmInputSchema = z.object({
  title: z.string(),
  priority: z.coerce.number().min(1).max(3),
  collectionId: z.coerce.number().min(1).nullable(),
  rating: z.coerce.number().min(1).max(3).nullable(),
});

export const GetPendingFilmsListQuerySchema = z
  .object({
    q: z.string(),
    pageIndex: z.coerce.number(),
    orderKey: z.string(),
    order: z.enum(['asc', 'desc']),
    priorities: getArrayFromQuery(z.coerce.number().min(1).max(3)),
  })
  .partial();

export const UpdatePendingFilmInputSchema = CreatePendingFilmInputSchema.partial();

export const PendingFilmResponseSchema = z.object({
  id: z.coerce.number(),
  title: z.string(),
  priority: z.coerce.number().min(1).max(3),
  rating: z.coerce.number().min(1).max(3).nullable(),
  collectionId: z.coerce.number().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const PendingFilmsListResponseSchema = z.object({
  list: z.array(PendingFilmResponseSchema),
  total: z.coerce.number(),
});

export const PendingFilmByIdResponseSchema = PendingFilmResponseSchema.omit({
  createdAt: true,
  updatedAt: true,
});

export type CreatePendingFilmInput = z.infer<typeof CreatePendingFilmInputSchema>;
export type UpdatePendingFilmInput = z.infer<typeof UpdatePendingFilmInputSchema>;
export type GetPendingFilmsListQuery = z.infer<typeof GetPendingFilmsListQuerySchema>;
