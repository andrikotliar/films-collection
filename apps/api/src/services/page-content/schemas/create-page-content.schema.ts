import { Static, Type } from '@sinclair/typebox';

export const CreatePageContentSchema = Type.Object({
  title: Type.String(),
  pageKey: Type.String(),
  content: Type.String(),
});

export type CreatePageContentPayload = Static<typeof CreatePageContentSchema>;
