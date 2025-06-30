import { Static, Type } from '@sinclair/typebox';

export const UpdateCollectionEventBodySchema = Type.Object(
  {
    title: Type.Optional(Type.String()),
    image: Type.Optional(Type.String()),
    collectionId: Type.Optional(Type.Number()),
    startDate: Type.Optional(Type.Number()),
    startMonth: Type.Optional(Type.Number()),
    endDate: Type.Optional(Type.Number()),
    endMonth: Type.Optional(Type.Number()),
    yearFrom: Type.Optional(Type.Number()),
    description: Type.String(),
    background: Type.Optional(
      Type.Object({
        leftColor: Type.String(),
        rightColor: Type.String(),
        angle: Type.String(),
      }),
    ),
  },
  { additionalProperties: false },
);

export type UpdateCollectionEventPayload = Static<
  typeof UpdateCollectionEventBodySchema
>;
