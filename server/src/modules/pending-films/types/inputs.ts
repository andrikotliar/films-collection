import { PendingFilm } from '@prisma/client';

export type CreatePendingFilmInput = Pick<PendingFilm, 'title' | 'priority'>;

export type UpdatePendingFilmInput = Partial<
  Pick<PendingFilm, 'title' | 'priority'>
>;
