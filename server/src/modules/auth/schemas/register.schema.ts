import { Static, Type } from '@sinclair/typebox';

export const AuthRegisterSchema = Type.Object(
  {
    username: Type.String(),
    password: Type.String({
      pattern: '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$',
    }),
  },
  { additionalProperties: false },
);

export type AuthRegisterPayload = Static<typeof AuthRegisterSchema>;
