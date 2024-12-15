import { PendingFilmEntity } from './pending-film.entity';

export type GetListQuery = Partial<{
  q: string;
  priority: number;
  skip: number;
  sortingField: keyof PendingFilmEntity;
  sortingDirection: 'asc' | 'desc';
}>;
