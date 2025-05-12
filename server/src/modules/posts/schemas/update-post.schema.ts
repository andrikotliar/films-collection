import { Static, Type } from '@sinclair/typebox';

export const UpdatePostSchema = Type.Object({
  title: Type.Optional(Type.String()),
  content: Type.Optional(Type.String()),
  pageKey: Type.Optional(Type.String()),
});

export const UpdatePostParamsSchema = Type.Object({
  id: Type.Number(),
});

export type UpdatePostPayload = Static<typeof UpdatePostSchema>;
