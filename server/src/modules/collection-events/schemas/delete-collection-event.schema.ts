import { Static, Type } from '@sinclair/typebox';

export const DeleteCollectionEventParamsSchema = Type.Object(
  {
    id: Type.Number(),
  },
  { additionalProperties: false },
);

export type DeleteCollectionEventParams = Static<
  typeof DeleteCollectionEventParamsSchema
>;
