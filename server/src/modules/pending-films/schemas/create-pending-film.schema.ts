import { Static, Type } from '@sinclair/typebox';

export const CreatePendingFilmBodySchema = Type.Object(
  {
    title: Type.String(),
    priority: Type.Number({ minimum: 1, maximum: 3 }),
    collectionId: Type.Union([Type.Number({ minimum: 1 }), Type.Null()]),
    rating: Type.Union([Type.Number({ minimum: 1, maximum: 3 }), Type.Null()]),
  },
  { additionalProperties: false },
);

export type CreatePendingFilmPayload = Static<
  typeof CreatePendingFilmBodySchema
>;
