import { Static, Type } from '@sinclair/typebox';
import { BackgroundSchema } from './background.schema';

export const UpdateCollectionEventBodySchema = Type.Object(
  {
    title: Type.Optional(Type.String()),
    collectionId: Type.Optional(Type.Number()),
    startDate: Type.Optional(Type.Number()),
    startMonth: Type.Optional(Type.Number()),
    endDate: Type.Optional(Type.Number()),
    endMonth: Type.Optional(Type.Number()),
    yearFrom: Type.Optional(Type.Number()),
    description: Type.String(),
    background: Type.Optional(BackgroundSchema),
  },
  { additionalProperties: false },
);

export type UpdateCollectionEventPayload = Static<typeof UpdateCollectionEventBodySchema>;
