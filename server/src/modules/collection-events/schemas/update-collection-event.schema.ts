import { Static, Type } from '@sinclair/typebox';

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
