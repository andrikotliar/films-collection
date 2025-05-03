import { Static, Type } from '@sinclair/typebox';

export const FilmsRelatedChaptersSchema = Type.Object({
  key: Type.String(),
  filmId: Type.Optional(Type.Number()),
});

export type FilmRelatedChaptersQuery = Static<
  typeof FilmsRelatedChaptersSchema
>;
