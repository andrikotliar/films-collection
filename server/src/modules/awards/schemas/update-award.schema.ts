import { Static, Type } from '@sinclair/typebox';

export const UpdateAwardBodySchema = Type.Object({
  title: Type.Optional(Type.String()),
  description: Type.Optional(Type.Union([Type.Null(), Type.String()])),
  image: Type.Optional(Type.String()),
});

export type UpdateAwardInput = Static<typeof UpdateAwardBodySchema>;
