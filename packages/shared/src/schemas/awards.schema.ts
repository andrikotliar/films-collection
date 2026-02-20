import z from 'zod';

export const NominationInputSchema = z.object({
  id: z.coerce.number(),
  title: z.string(),
  shouldIncludeActor: z.boolean(),
});

export const CreateAwardInputSchema = z.object({
  title: z.string(),
  description: z.string().nullable(),
  nominations: z.array(NominationInputSchema),
});

export const UpdateAwardInputSchema = CreateAwardInputSchema.partial();

export const AwardResponseSchema = z.object({
  id: z.coerce.number(),
  title: z.string(),
  description: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const AwardsListResponseSchema = z.array(
  AwardResponseSchema.pick({
    id: true,
    title: true,
  }),
);

export const AwardWithNominationsResponseSchema = z
  .object({
    ...AwardResponseSchema.omit({ createdAt: true, updatedAt: true }).shape,
    nominations: z.array(NominationInputSchema),
  })
  .nullable();

export const NominationResponseSchema = z.object({
  ...NominationInputSchema.shape,
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type CreateAwardInput = z.infer<typeof CreateAwardInputSchema>;
export type NominationInput = z.infer<typeof NominationInputSchema>;
export type UpdateAwardInput = z.infer<typeof UpdateAwardInputSchema>;
