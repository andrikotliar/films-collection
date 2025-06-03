import { Static, Type } from '@sinclair/typebox';

export const CreatePendingFilmBodySchema = Type.Object(
  {
    title: Type.String(),
    priority: Type.Number({ minimum: 1, maximum: 3 }),
    collectionId: Type.Union([Type.Null(), Type.Number({ minimum: 1 })]),
    rating: Type.Union([Type.Null(), Type.Number({ minimum: 1, maximum: 3 })]),
  },
  { additionalProperties: false },
);

export type CreatePendingFilmInput = Static<typeof CreatePendingFilmBodySchema>;
