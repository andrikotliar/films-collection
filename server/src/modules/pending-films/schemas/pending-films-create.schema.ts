import { Static, Type } from '@sinclair/typebox';

export const PendingFilmsCreateBodySchema = Type.Object(
  {
    title: Type.String(),
    priority: Type.Number({ minimum: 1, maximum: 3 }),
  },
  { additionalProperties: false },
);

export type PendingFilmsCreatePayload = Static<
  typeof PendingFilmsCreateBodySchema
>;
