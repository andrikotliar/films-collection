import { Static, Type } from '@sinclair/typebox';

export const GetListQueriesSchema = Type.Object({
  skip: Type.Number(),
});

export type GetListQueries = Static<typeof GetListQueriesSchema>;
