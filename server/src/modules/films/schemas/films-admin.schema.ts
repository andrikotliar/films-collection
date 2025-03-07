import { Static, Type } from '@sinclair/typebox';

export const FilmsAdminGetListQuerySchema = Type.Object({
  q: Type.Optional(Type.String()),
  skip: Type.Optional(Type.Number()),
  orderKey: Type.Optional(Type.String()),
  order: Type.Optional(Type.String()),
});

export type FilmsAdminQuery = Static<typeof FilmsAdminGetListQuerySchema>;

export const DeleteFilmParamsSchema = Type.Object({
  id: Type.Number(),
});

export type DeleteFilmParams = Static<typeof DeleteFilmParamsSchema>;

export const UpdateFilmParamsSchema = Type.Object({
  id: Type.Number(),
});
