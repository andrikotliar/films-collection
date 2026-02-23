import z from 'zod';

export const CreateCollectionEventInputSchema = z.object({
  title: z.string(),
  collectionId: z.coerce.number(),
  startDateCode: z.coerce.number().min(101).max(1231),
  endDateCode: z.coerce.number().min(101).max(1231),
  yearFrom: z.coerce.number(),
  titleFilmId: z.coerce.number().min(1, { error: 'Title film cannot be empty' }),
});

export const UpdateCollectionEventInputSchema = CreateCollectionEventInputSchema.partial();

export const CollectionEventResponseSchema = z.object({
  ...CreateCollectionEventInputSchema.shape,
  id: z.coerce.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const CollectionEventsListResponseSchema = z.array(
  z.object({
    ...CollectionEventResponseSchema.omit({
      createdAt: true,
      updatedAt: true,
    }).shape,
  }),
);

export const CollectionCurrentEventsListResponseSchema = z.array(
  z.object({
    ...CollectionEventResponseSchema.pick({
      id: true,
      title: true,
      yearFrom: true,
      collectionId: true,
    }).shape,
    poster: z.string().nullable(),
  }),
);

export type CreateCollectionEventInput = z.infer<typeof CreateCollectionEventInputSchema>;
export type UpdateCollectionEventInput = z.infer<typeof UpdateCollectionEventInputSchema>;
