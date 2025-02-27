import { Static, Type } from '@sinclair/typebox';

export const CollectionEventsCreateSchema = Type.Object(
  {
    title: Type.String(),
    image: Type.String(),
    collectionId: Type.Number(),
    startDate: Type.Object({
      month: Type.Number(),
      date: Type.Number(),
    }),
    endDate: Type.Object({
      month: Type.Number(),
      date: Type.Number(),
    }),
  },
  { additionalProperties: false },
);

export type CollectionEventsCreatePayload = Static<
  typeof CollectionEventsCreateSchema
>;
