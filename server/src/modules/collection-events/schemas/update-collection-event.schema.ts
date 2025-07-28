import { Static, Type } from '@sinclair/typebox';

export const UpdateCollectionEventBodySchema = Type.Object(
  {
    title: Type.Optional(Type.String()),
    collectionId: Type.Optional(Type.Number()),
    startDate: Type.Optional(Type.String()),
    endDate: Type.Optional(Type.String()),
    yearFrom: Type.Optional(Type.Number()),
    titleFilmId: Type.Number(),
  },
  { additionalProperties: false },
);

export type UpdateCollectionEventPayload = Static<typeof UpdateCollectionEventBodySchema>;
