import { Static, Type } from '@sinclair/typebox';

export const UpdateNominationBodySchema = Type.Object({
  title: Type.Optional(Type.String()),
  awardId: Type.Optional(Type.Number()),
  shouldIncludeActor: Type.Optional(Type.Boolean()),
});

export type UpdateNominationInput = Static<typeof UpdateNominationBodySchema>;
