import { PendingFilmEntity } from './pending-film.entity';
import { SortingParams } from 'src/common';

export type GetListQuery = Partial<
  {
    q: string;
    priorities: number[];
    skip: number;
  } & SortingParams<keyof PendingFilmEntity>
>;
