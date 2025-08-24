import { Static, Type } from '@sinclair/typebox';

export const CreatePersonSchema = Type.Object({
  name: Type.String(),
});

export type CreatePersonInput = Static<typeof CreatePersonSchema>;
