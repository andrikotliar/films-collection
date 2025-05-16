import { Static, Type } from '@sinclair/typebox';

export const DeleteFilmParamsSchema = Type.Object({
  id: Type.Number(),
});

export type DeleteFilmParams = Static<typeof DeleteFilmParamsSchema>;
