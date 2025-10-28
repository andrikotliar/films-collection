import { Static, Type } from '@sinclair/typebox';

export const ManageGenreBodySchema = Type.Object({
  title: Type.String(),
});

export type ManageGenreInput = Static<typeof ManageGenreBodySchema>;
