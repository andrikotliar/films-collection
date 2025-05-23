import { Static, Type } from '@sinclair/typebox';

export const GetFilmDetailsParamsSchema = Type.Object(
  {
    id: Type.Number(),
  },
  { additionalProperties: false },
);

export type GetFilmDetailsParams = Static<typeof GetFilmDetailsParamsSchema>;
