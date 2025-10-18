import { Static, Type } from '@sinclair/typebox';

export const GetFilmRelatedChaptersSchema = Type.Object({
  key: Type.String(),
  filmId: Type.Optional(Type.Number()),
});

export type GetFilmRelatedChaptersQuery = Static<
  typeof GetFilmRelatedChaptersSchema
>;
