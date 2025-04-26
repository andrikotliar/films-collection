import { Static, Type } from '@sinclair/typebox';

export const SearchPersonSchema = Type.Object({
  q: Type.String(),
});

export type SearchPersonQuery = Static<typeof SearchPersonSchema>;
