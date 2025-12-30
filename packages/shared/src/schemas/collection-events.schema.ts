import z from 'zod';

export const CreateCollectionEventInputSchema = z.object({
  title: z.string(),
  collectionId: z.number(),
  startDateCode: z.number().min(101).max(1231),
  endDateCode: z.number().min(101).max(1231),
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
    ...CollectionEventResponseSchema.omit({
      titleFilmId: true,
      collectionId: true,
      createdAt: true,
      updatedAt: true,
    }).shape,
    filmsCount: z.number(),
    collection: z.object({
      id: z.number(),
      title: z.string(),
    }),
    film: z
      .object({
        id: z.number(),
        poster: z.string(),
      })
      .nullable(),
  }),
);

export type CreateCollectionEventInput = z.infer<typeof CreateCollectionEventInputSchema>;
export type UpdateCollectionEventInput = z.infer<typeof UpdateCollectionEventInputSchema>;
