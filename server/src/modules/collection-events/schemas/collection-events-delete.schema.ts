import { Static, Type } from '@sinclair/typebox';

export const CollectionEventsDeleteParamsSchema = Type.Object(
  {
    id: Type.Number(),
  },
  { additionalProperties: false },
);

export type CollectionEventsDeleteParams = Static<
  typeof CollectionEventsDeleteParamsSchema
>;
