import { Static, Type } from '@sinclair/typebox';

export const CreatePersonSchema = Type.Object({
  name: Type.String(),
  image: Type.Union([Type.String(), Type.Null()]),
});

export type CreatePersonInput = Static<typeof CreatePersonSchema>;
