import { Static, Type } from '@sinclair/typebox';

export const FindNominationsSchema = Type.Object({
  awardId: Type.Union([Type.Null(), Type.Number()]),
});

export type FindNominationsQuery = Static<typeof FindNominationsSchema>;
