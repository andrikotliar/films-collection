import { Static, Type } from '@sinclair/typebox';

export const UpdatePendingFilmBodySchema = Type.Object(
  {
    title: Type.Optional(Type.String()),
    priority: Type.Optional(Type.Number({ minimum: 1, maximum: 3 })),
    collectionId: Type.Optional(
      Type.Union([Type.Null(), Type.Number({ minimum: 1 })]),
    ),
    rating: Type.Optional(
      Type.Union([Type.Null(), Type.Number({ minimum: 1, maximum: 3 })]),
    ),
  },
  { additionalProperties: false },
);

export type UpdatePendingFilmInput = Static<typeof UpdatePendingFilmBodySchema>;
