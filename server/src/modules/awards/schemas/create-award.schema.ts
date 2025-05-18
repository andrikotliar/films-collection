import { Static, Type } from '@sinclair/typebox';

export const CreateAwardBodySchema = Type.Object({
  title: Type.String(),
  description: Type.Union([Type.Null(), Type.String()]),
  image: Type.String(),
  nominations: Type.Array(
    Type.Object({
      title: Type.String(),
      shouldIncludeActor: Type.Boolean(),
    }),
  ),
});

export type CreateAwardInput = Static<typeof CreateAwardBodySchema>;
