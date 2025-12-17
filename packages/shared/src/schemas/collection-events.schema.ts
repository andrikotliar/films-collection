import z from 'zod';

export const CreateCollectionEventInputSchema = z.object({
  title: z.string(),
  collectionId: z.number(),
  startDateCode: z.number(),
  endDateCode: z.number(),
  yearFrom: z.number(),
  titleFilmId: z.number(),
});

export const UpdateCollectionEventInputSchema = CreateCollectionEventInputSchema.partial();

export type CreateCollectionEventInput = z.infer<typeof CreateCollectionEventInputSchema>;
export type UpdateCollectionEventInput = z.infer<typeof UpdateCollectionEventInputSchema>;
