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

export const CollectionEventResponseSchema = z.object({
  ...CreateCollectionEventInputSchema.shape,
  id: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CollectionEventsListResponseSchema = z.array(
  z.object({
    ...CollectionEventResponseSchema.shape,
    filmsCount: z.number(),
    collection: z.object({
      id: z.number(),
      title: z.number(),
    }),
    film: z
      .object({
        id: z.number(),
        title: z.string(),
      })
      .nullable(),
  }),
);

export type CreateCollectionEventInput = z.infer<typeof CreateCollectionEventInputSchema>;
export type UpdateCollectionEventInput = z.infer<typeof UpdateCollectionEventInputSchema>;
