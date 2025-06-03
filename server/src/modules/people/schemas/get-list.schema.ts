import { Static, Type } from '@sinclair/typebox';

export const GetListQueriesSchema = Type.Object({
  skip: Type.Number(),
  q: Type.Optional(Type.String()),
});

export type GetListQueries = Static<typeof GetListQueriesSchema>;
