import { Static, Type } from '@sinclair/typebox';

export const UpdateCollectionEventBodySchema = Type.Object(
  {
    title: Type.Optional(Type.String()),
    collectionId: Type.Optional(Type.Number()),
    startDateCode: Type.Optional(Type.Number()),
    endDateCode: Type.Optional(Type.Number()),
    yearFrom: Type.Optional(Type.Number()),
    titleFilmId: Type.Optional(Type.Number()),
  },
  { additionalProperties: false },
);

export type UpdateCollectionEventPayload = Static<typeof UpdateCollectionEventBodySchema>;
