import { Static, Type } from '@sinclair/typebox';

export const AuthLoginSchema = Type.Object(
  {
    username: Type.String(),
    password: Type.String(),
  },
  { additionalProperties: false },
);

export type AuthLoginPayload = Static<typeof AuthLoginSchema>;
