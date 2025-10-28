import { Static, Type } from '@sinclair/typebox';

export const CreateChapterKeySchema = Type.Object({
  key: Type.String(),
});

export type CreateChapterKeyPayload = Static<typeof CreateChapterKeySchema>;
