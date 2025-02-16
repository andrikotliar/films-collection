import { PendingFilm } from '@prisma/client';

export type GetListQuery = Partial<{
  q: string;
  priorities: number[];
  skip: number;
  orderKey: keyof PendingFilm;
  order: SortingOrder;
}>;
