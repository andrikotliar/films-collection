import z from 'zod';

export const IdParamSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const NullableIdParamSchema = z.object({
  id: z.coerce.number().nullable(),
});
