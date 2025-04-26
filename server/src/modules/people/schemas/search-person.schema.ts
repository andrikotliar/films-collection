import { Static, Type } from '@sinclair/typebox';

export const SearchPersonSchema = Type.Object({
  q: Type.String(),
  selectedIds: Type.Optional(Type.Array(Type.Number())),
});

export type SearchPersonQuery = Static<typeof SearchPersonSchema>;
