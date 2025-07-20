import { Static, Type } from '@sinclair/typebox';

const NominationSchema = Type.Object({
  id: Type.Number(),
  title: Type.String(),
  shouldIncludeActor: Type.Boolean(),
});

export const AwardBodySchema = Type.Object({
  title: Type.String(),
  description: Type.Union([Type.Null(), Type.String()]),
  nominations: Type.Array(NominationSchema),
});

export type AwardInput = Static<typeof AwardBodySchema>;
export type NominationInput = Static<typeof NominationSchema>;
