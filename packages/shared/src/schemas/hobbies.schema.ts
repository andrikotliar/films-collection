import { z } from 'zod';
import { getListResponseSchema } from '../helpers/index.js';

export const HobbyMutationSchema = z.object({
  title: z.string().min(3).trim(),
});

export const HobbyResponseSchema = z.object({
  id: z.number(),
  title: z.string(),
});

export const HobbiesListResponseSchema = getListResponseSchema(z.array(HobbyResponseSchema));

export const HobbyItemResponseSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
});

export const HobbyByIdQueriesSchema = z
  .object({ pageIndex: z.number(), q: z.string(), collectionId: z.number() })
  .partial();

export const HobbyByIdResponseSchema = HobbyResponseSchema.extend({
  items: z.array(HobbyResponseSchema),
});
