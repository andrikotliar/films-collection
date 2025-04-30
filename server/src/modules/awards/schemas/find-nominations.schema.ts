import { Static, Type } from '@sinclair/typebox';

export const FindNominationsSchema = Type.Object({
  awardId: Type.Union([Type.Number(), Type.Null()]),
});

export type FindNominationsQuery = Static<typeof FindNominationsSchema>;
