import { Static, Type } from '@sinclair/typebox';

export const CreateCollectionEventSchema = Type.Object(
  {
    title: Type.String(),
    collectionId: Type.Number(),
    startDate: Type.String(),
    endDate: Type.String(),
    yearFrom: Type.Optional(Type.Number()),
    titleFilmId: Type.Number(),
  },
  { additionalProperties: false },
);

export type CreateCollectionEventPayload = Static<typeof CreateCollectionEventSchema>;
