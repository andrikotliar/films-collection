import { Static, Type } from '@sinclair/typebox';

export const UpdateCollectionEventParamsSchema = Type.Object(
  {
    id: Type.Number(),
  },
  { additionalProperties: false },
);

export type CollectionEventsUpdateParams = Static<
  typeof UpdateCollectionEventParamsSchema
>;

export const UpdateCollectionEventBodySchema = Type.Object(
  {
    title: Type.Optional(Type.String()),
    image: Type.Optional(Type.String()),
    collectionId: Type.Optional(Type.Number()),
    startDate: Type.Optional(
      Type.Object({
        month: Type.Number(),
        date: Type.Number(),
      }),
    ),
    endDate: Type.Optional(
      Type.Object({
        month: Type.Number(),
        date: Type.Number(),
      }),
    ),
  },
  { additionalProperties: false },
);

export type UpdateCollectionEventPayload = Static<
  typeof UpdateCollectionEventBodySchema
>;
