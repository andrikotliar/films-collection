import { Type, type Static } from '@sinclair/typebox';

export const UpdateFilmWatchCounterSchema = Type.Object({
  counter: Type.Number({ minimum: 0, maximum: 1000 }),
});

export type FilmWatchCounterPayload = Static<typeof UpdateFilmWatchCounterSchema>;
