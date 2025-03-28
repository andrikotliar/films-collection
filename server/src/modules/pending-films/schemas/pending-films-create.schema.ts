import { Static, Type } from '@sinclair/typebox';

export const PendingFilmsCreateBodySchema = Type.Object(
  {
    title: Type.String(),
    priority: Type.Number({ minimum: 1, maximum: 3 }),
    collectionId: Type.Union([Type.Number(), Type.Null()]),
    rating: Type.Union([Type.Number({ minimum: 1, maximum: 3 }), Type.Null()]),
  },
  { additionalProperties: false },
);

export type PendingFilmsCreatePayload = Static<
  typeof PendingFilmsCreateBodySchema
>;
