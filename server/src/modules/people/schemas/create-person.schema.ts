import { Static, Type } from '@sinclair/typebox';

export const CreatePersonSchema = Type.Object({
  name: Type.String(),
  image: Type.Union([Type.Null(), Type.String()]),
});

export type CreatePersonInput = Static<typeof CreatePersonSchema>;
