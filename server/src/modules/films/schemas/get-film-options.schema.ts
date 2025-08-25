import { Type, type Static } from '@sinclair/typebox';

export const GetFilmOptionsSchema = Type.Object({
  q: Type.Optional(Type.String()),
  selected: Type.Optional(Type.Array(Type.Number())),
});

export type FilmOptionsQueries = Static<typeof GetFilmOptionsSchema>;
