import { Static, Type } from '@sinclair/typebox';
import { BackgroundSchema } from './background.schema';

export const CreateCollectionEventSchema = Type.Object(
  {
    title: Type.String(),
    collectionId: Type.Number(),
    startDate: Type.Number(),
    startMonth: Type.Number(),
    endDate: Type.Number(),
    endMonth: Type.Number(),
    yearFrom: Type.Optional(Type.Number()),
    description: Type.String(),
    background: BackgroundSchema,
  },
  { additionalProperties: false },
);

export type CreateCollectionEventPayload = Static<typeof CreateCollectionEventSchema>;
