import z from 'zod';

const NominationInputSchema = z.object({
  id: z.number(),
  title: z.string(),
  shouldIncludeActor: z.boolean(),
});

export const CreateAwardInputSchema = z.object({
  title: z.string(),
  description: z.string().nullable(),
  nominations: z.array(NominationInputSchema),
});

export const UpdateAwardInputSchema = CreateAwardInputSchema.partial();

export type CreateAwardInput = z.infer<typeof CreateAwardInputSchema>;
export type NominationInput = z.infer<typeof NominationInputSchema>;
export type UpdateAwardInput = z.infer<typeof UpdateAwardInputSchema>;
