import { Static, Type } from '@sinclair/typebox';

export const PendingFilmsFindSchema = Type.Object({
  id: Type.Number(),
});

export type FindPendingFilmParams = Static<typeof PendingFilmsFindSchema>;
