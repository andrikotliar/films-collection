export type PendingFilm = {
  _id: string;
  title: string;
  priority: number;
  createdAt: string;
};

export type PendingFilmQueryFilters = Partial<{
  q: string;
  priority: number;
  skip: number;
  sortingField: string;
  sortingDirection: string;
}>;
