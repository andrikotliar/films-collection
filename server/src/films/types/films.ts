import { ActorType } from 'src/actors/types';
import { FilmData } from './film.entity';

type FilmsListItem = Pick<
  FilmData,
  '_id' | 'title' | 'poster' | 'collections' | 'releaseDate'
>;

type AdditionalActorData = {
  type: 'actor';
  data: ActorType;
};

type AdditionalCrewInfo = {
  type: 'crew';
  data: {
    role: string;
    name: string;
  };
};

type AdditionalCollectionInfo = {
  type: 'collection';
  data: string;
};

type AdditionalAwardsInfo = {
  type: 'awards';
  data: string[];
};

type AdditionalInfo =
  | AdditionalActorData
  | AdditionalCrewInfo
  | AdditionalCollectionInfo
  | AdditionalAwardsInfo;

type FilteredFilms = {
  films: FilmsListItem[];
  total: number;
  additionalInfo: AdditionalInfo | null;
};

type SingleFilm = FilmData & {
  chapters?: FilmBaseData[];
};

type Anniversary = Pick<FilmData, '_id' | 'title'>;

type FilmBaseData = Pick<FilmData, '_id' | 'title' | 'poster'>;

type SearchedFilm = Pick<
  FilmData,
  '_id' | 'title' | 'poster' | 'releaseDate' | 'genres'
>;

export type {
  FilteredFilms,
  SingleFilm,
  Anniversary,
  FilmBaseData,
  SearchedFilm,
  AdditionalInfo,
};
