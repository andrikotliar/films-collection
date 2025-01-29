import { Award, Collection, Film, Genre, Person } from '@prisma/client';

export type AdditionalActorData = {
  type: 'actor';
  data: Person;
};

export type AdditionalCrewInfo = {
  type: 'crew';
  data: {
    role: string;
    name: string;
  };
};

export type AdditionalCollectionInfo = {
  type: 'collection';
  data: Collection;
};

export type AdditionalAwardsInfo = {
  type: 'awards';
  data: Omit<Award, 'image'>[];
};

export type AdditionalInfo =
  | AdditionalActorData
  | AdditionalCrewInfo
  | AdditionalCollectionInfo
  | AdditionalAwardsInfo;

export type FilteredFilms = {
  films: Pick<Film, 'id' | 'title' | 'poster'>[];
  total: number;
  additionalInfo: AdditionalInfo | null;
};

export type SingleFilm = Film & {
  chapters: FilmBaseData[];
};

export type Anniversary = Pick<Film, 'id' | 'title'>;

export type FilmBaseData = Pick<Film, 'id' | 'title' | 'poster'>;

export type SearchedFilm = Pick<
  Film,
  'id' | 'title' | 'poster' | 'releaseDate'
> & {
  genres: Genre[];
};
