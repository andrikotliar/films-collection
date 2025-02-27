import { Static, Type } from '@sinclair/typebox';

export const FilmsSearchQuerySchema = Type.Object({
  q: Type.String(),
});

export type FilmsSearchQuery = Static<typeof FilmsSearchQuerySchema>;
