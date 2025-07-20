import { Static, Type } from '@sinclair/typebox';

export const UpdatePageContentSchema = Type.Object({
  title: Type.Optional(Type.String()),
  content: Type.Optional(Type.String()),
  pageUrl: Type.Optional(Type.String()),
});

export type UpdatePostPayload = Static<typeof UpdatePageContentSchema>;
