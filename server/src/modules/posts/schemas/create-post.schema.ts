import { Static, Type } from '@sinclair/typebox';

export const CreatePostSchema = Type.Object({
  title: Type.String(),
  pageKey: Type.Optional(Type.String()),
  content: Type.String(),
});

export type CreatePostPayload = Static<typeof CreatePostSchema>;
