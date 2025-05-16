import { Static, Type } from '@sinclair/typebox';

export const DeletePendingFilmParamsSchema = Type.Object({
  id: Type.Number(),
});

export type DeletePendingFilmParams = Static<
  typeof DeletePendingFilmParamsSchema
>;
