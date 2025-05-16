import { Static, Type } from '@sinclair/typebox';

export const UpdatePendingFilmParamsSchema = Type.Object({
  id: Type.Number(),
});

export type UpdatePendingFilmParams = Static<
  typeof UpdatePendingFilmParamsSchema
>;

export const UpdatePendingFilmBodySchema = Type.Object(
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

export type UpdatePendingFilmPayload = Static<
  typeof UpdatePendingFilmBodySchema
>;
