import { PendingFilmEntity } from './pending-film.entity';

export type UpdatePendingFilmPayload = Partial<
  Pick<PendingFilmEntity, 'title' | 'priority'>
>;
