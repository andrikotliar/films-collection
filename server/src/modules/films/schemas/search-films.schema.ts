import { Static, Type } from '@sinclair/typebox';

export const SearchFilmsQuerySchema = Type.Object({
  q: Type.String(),
});

export type SearchFilmsQuery = Static<typeof SearchFilmsQuerySchema>;
