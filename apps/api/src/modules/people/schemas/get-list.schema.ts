import { PersonRole } from '@prisma/client';
import { Static, Type } from '@sinclair/typebox';

export const GetListQueriesSchema = Type.Object({
  skip: Type.Number(),
  q: Type.Optional(Type.String()),
  role: Type.Optional(Type.Enum(PersonRole)),
});

export type GetListQueries = Static<typeof GetListQueriesSchema>;
