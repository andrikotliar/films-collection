import { Static, Type } from '@sinclair/typebox';

export const CreateCollectionEventSchema = Type.Object(
  {
    title: Type.String(),
    collectionId: Type.Number(),
    startDateCode: Type.Number(),
    endDateCode: Type.Number(),
    yearFrom: Type.Number(),
    titleFilmId: Type.Number(),
  },
  { additionalProperties: false },
);

export type CreateCollectionEventPayload = Static<typeof CreateCollectionEventSchema>;
