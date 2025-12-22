import z from 'zod';

const NominationInputSchema = z.object({
  id: z.number(),
  title: z.string(),
  shouldIncludeActor: z.boolean(),
});

const BaseAwardSchema = z.object({
  title: z.string(),
  description: z.string().nullable(),
});

export const CreateAwardInputSchema = z.object({
  ...BaseAwardSchema.shape,
  nominations: z.array(NominationInputSchema),
});

export const FindNominationsQuerySchema = z.object({
  awardId: z.number().nullable(),
});

export const UpdateAwardInputSchema = BaseAwardSchema.partial();

export type CreateAwardInput = z.infer<typeof CreateAwardInputSchema>;
export type NominationInput = z.infer<typeof NominationInputSchema>;
export type FindNominationsQuery = z.infer<typeof FindNominationsQuerySchema>;
export type UpdateAwardInput = z.infer<typeof UpdateAwardInputSchema>;
