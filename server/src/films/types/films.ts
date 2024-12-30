import { ActorType } from '../../actors/types';
import { FilmData } from './film.entity';
import { Award } from '../../awards/types';
import { Collection } from 'src/collections/types';

export type FilmsListItem = Pick<
  FilmData,
  '_id' | 'title' | 'poster' | 'releaseDate'
>;

export type AdditionalActorData = {
  type: 'actor';
  data: ActorType;
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
  data: Omit<Award, 'nominations'>[];
};

export type AdditionalInfo =
  | AdditionalActorData
  | AdditionalCrewInfo
  | AdditionalCollectionInfo
  | AdditionalAwardsInfo;

export type FilteredFilms = {
  films: FilmsListItem[];
  total: number;
  additionalInfo: AdditionalInfo | null;
};

export type SingleFilm = FilmData & {
  chapters?: FilmBaseData[];
};

export type Anniversary = Pick<FilmData, '_id' | 'title'>;

export type FilmBaseData = Pick<FilmData, '_id' | 'title' | 'poster'>;

export type SearchedFilm = Pick<
  FilmData,
  '_id' | 'title' | 'poster' | 'releaseDate' | 'genres'
>;
