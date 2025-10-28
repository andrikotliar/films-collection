import { Static, Type } from '@sinclair/typebox';

export const GetPendingFilmsListQuerySchema = Type.Object(
  {
    q: Type.Optional(Type.String()),
    skip: Type.Optional(Type.Number()),
    orderKey: Type.Optional(Type.String()),
    order: Type.Optional(Type.String()),
    priorities: Type.Optional(
      Type.Array(Type.Number({ minimum: 1, maximum: 3 })),
    ),
  },
  { additionalProperties: false },
);

export type GetPendingFilmsListQuery = Static<
  typeof GetPendingFilmsListQuerySchema
>;
