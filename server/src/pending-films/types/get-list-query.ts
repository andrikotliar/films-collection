import { SortOrder } from 'mongoose';
import { PendingFilmEntity } from './pending-film.entity';

export type GetListQuery = Partial<{
  q: string;
  priorities: number[];
  skip: number;
  sortingField: keyof PendingFilmEntity;
  sortingDirection: SortOrder;
}>;
