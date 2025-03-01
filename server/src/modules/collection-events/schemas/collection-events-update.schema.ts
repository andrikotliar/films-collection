import { Static, Type } from '@sinclair/typebox';

export const CollectionEventsUpdateParamsSchema = Type.Object(
  {
    id: Type.Number(),
  },
  { additionalProperties: false },
);

export type CollectionEventsUpdateParams = Static<
  typeof CollectionEventsUpdateParamsSchema
>;

export const CollectionEventsUpdateBodySchema = Type.Object(
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

export type CollectionEventsUpdatePayload = Static<
  typeof CollectionEventsUpdateBodySchema
>;
