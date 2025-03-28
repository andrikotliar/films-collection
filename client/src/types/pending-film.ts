export type PendingFilm = {
  id: number;
  title: string;
  priority: number;
  rating: number | null;
  collectionId: number | null;
  createdAt: string;
};

export type BasePendingFilmFilters = {
  q: string;
  priorities: number[];
  orderKey: string;
  order: string;
};

export type PendingFilmQueryFilters = Partial<
  BasePendingFilmFilters & {
    pageIndex: number;
  }
>;

export type PendingFilmServerFilters = Partial<
  BasePendingFilmFilters & {
    skip: number;
  }
>;
