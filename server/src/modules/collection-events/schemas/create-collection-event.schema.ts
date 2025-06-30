import { Static, Type } from '@sinclair/typebox';

export const CreateCollectionEventSchema = Type.Object(
  {
    title: Type.String(),
    image: Type.String(),
    collectionId: Type.Number(),
    startDate: Type.Number(),
    startMonth: Type.Number(),
    endDate: Type.Number(),
    endMonth: Type.Number(),
    yearFrom: Type.Optional(Type.Number()),
    description: Type.String(),
    background: Type.Object({
      leftColor: Type.String(),
      rightColor: Type.String(),
      angle: Type.String(),
    }),
  },
  { additionalProperties: false },
);

export type CreateCollectionEventPayload = Static<
  typeof CreateCollectionEventSchema
>;
