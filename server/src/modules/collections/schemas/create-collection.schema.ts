import { CollectionCategory } from '@prisma/client';
import { Static, Type } from '@sinclair/typebox';

export const CreateCollectionBodySchema = Type.Object({
  title: Type.String(),
  category: Type.Enum(CollectionCategory),
});

export type CreateCollectionInput = Static<typeof CreateCollectionBodySchema>;
