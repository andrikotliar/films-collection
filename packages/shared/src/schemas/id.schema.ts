import z from 'zod';

export const IdParamSchema = z.object({
  id: z.number(),
});

export const NullableIdParamSchema = z.object({
  id: z.number().nullable(),
});
