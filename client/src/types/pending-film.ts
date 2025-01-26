export type PendingFilm = {
  _id: string;
  title: string;
  priority: number;
  createdAt: string;
};

export type BasePendingFilmFilters = {
  q: string;
  priorities: number[];
  sortingField: string;
  sortingDirection: string;
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
