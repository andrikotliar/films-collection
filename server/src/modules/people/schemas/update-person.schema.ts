import { Static, Type } from '@sinclair/typebox';

export const UpdatePersonBodySchema = Type.Object({
  name: Type.Optional(Type.String()),
  image: Type.Optional(Type.Union([Type.Null(), Type.String()])),
});

export type UpdatePersonInput = Static<typeof UpdatePersonBodySchema>;
