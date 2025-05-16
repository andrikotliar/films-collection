import { Static, Type } from '@sinclair/typebox';

export const GetAdminListQuerySchema = Type.Object({
  q: Type.Optional(Type.String()),
  skip: Type.Optional(Type.Number()),
  orderKey: Type.Optional(Type.String()),
  order: Type.Optional(Type.String()),
});

export type GetAdminListQuery = Static<typeof GetAdminListQuerySchema>;
