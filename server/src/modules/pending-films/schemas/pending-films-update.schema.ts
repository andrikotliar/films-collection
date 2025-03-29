import { Static, Type } from '@sinclair/typebox';

export const PendingFilmsUpdateParamsSchema = Type.Object({
  id: Type.Number(),
});

export type PendingFilmsUpdateParams = Static<
  typeof PendingFilmsUpdateParamsSchema
>;

export const PendingFilmsUpdateBodySchema = Type.Object(
  {
    title: Type.Optional(Type.String()),
    priority: Type.Optional(Type.Number({ minimum: 1, maximum: 3 })),
    collectionId: Type.Optional(
      Type.Union([Type.Number({ minimum: 1 }), Type.Null()]),
    ),
    rating: Type.Optional(
      Type.Union([Type.Number({ minimum: 1, maximum: 3 }), Type.Null()]),
    ),
  },
  { additionalProperties: false },
);

export type PendingFilmsUpdatePayload = Static<
  typeof PendingFilmsUpdateBodySchema
>;
