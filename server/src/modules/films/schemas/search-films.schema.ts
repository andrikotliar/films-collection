import { Type } from '@sinclair/typebox';

export const SearchFilmsQuerySchema = Type.Object({
  q: Type.String(),
});
