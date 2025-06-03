import { CollectionCategory } from '@prisma/client';
import { Static, Type } from '@sinclair/typebox';

export const UpdateCollectionBodySchema = Type.Object({
  title: Type.Optional(Type.String()),
  category: Type.Optional(Type.Enum(CollectionCategory)),
});

export type UpdateCollectionInput = Static<typeof UpdateCollectionBodySchema>;
