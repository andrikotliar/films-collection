import { Person } from './person';
import { Award, Nomination } from './award';
import { Collection } from './collection';

export type TitleType = 'FILM' | 'SERIES';
export type TitleStyle = 'ANIMATION' | 'LIVE_ACTION';
export type PersonRole =
  | 'DIRECTOR'
  | 'WRITER'
  | 'COMPOSER'
  | 'CAMERAMAN'
  | 'CREATOR'
  | 'ACTOR';

export type FilmPersonData = {
  id: number;
  name: string;
  image: string;
  comment: string | null;
  details: string | null;
};

export type FilmPerson = {
  role: PersonRole;
  people: FilmPersonData[];
};

export type FilmAward = {
  award: Pick<Award, 'id' | 'title' | 'image'>;
  nominations: Nomination[];
};

export type FilmTrailer = {
  id: number;
  videoId: string;
  order: number;
};

export type SeriesExtension = {
  episodesTotal: number;
  seasonsTotal: number;
  finishedAt: string;
};

export type IncludedCollection = {
  collection: Pick<Collection, 'id' | 'title'>;
  order: number;
};

export type FilmBaseDataItem = {
  id: number;
  title: string;
};

export type FilmBaseData<K extends string> = {
  [key in K]: FilmBaseDataItem;
};

export type Chapter = Pick<Film, 'id' | 'title' | 'poster'> & {
  chapterOrder: number;
};

export type Film = {
  id: number;
  type: TitleType;
  style: TitleStyle;
  title: string;
  genres: FilmBaseData<'genre'>[];
  studios: FilmBaseData<'studio'>[];
  description: string;
  countries: FilmBaseData<'country'>[];
  releaseDate: string;
  duration: number;
  castAndCrew: FilmPerson[];
  collections: FilmBaseData<'collection'>[];
  budget: number | null;
  boxOffice: number | null;
  awards: FilmAward[];
  seriesExtension: SeriesExtension | null;
  rating: number;
  poster: string;
  trailers: FilmTrailer[];
  chapters: Chapter[] | null;
  chapterOrder: number | null;
  draft?: boolean;
};

export type FilmDetails = Omit<
  Film,
  'genres' | 'countries' | 'collections' | 'studios'
> & {
  genres: FilmBaseDataItem[];
  countries: FilmBaseDataItem[];
  collections: FilmBaseDataItem[];
  studios: FilmBaseDataItem[];
};

export type FilmsListItem = Pick<
  Film,
  'id' | 'title' | 'poster' | 'releaseDate'
>;

export type FilmSearchResult = Pick<
  Film,
  'id' | 'title' | 'genres' | 'poster' | 'releaseDate'
>;

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
  type: 'award';
  data: Award;
};

export type AdditionalInfo =
  | AdditionalActorData
  | AdditionalCrewInfo
  | AdditionalCollectionInfo
  | AdditionalAwardsInfo;

export type FilmsListResponse = {
  films: FilmsListItem[];
  total: number;
  additionalInfo: AdditionalInfo | null;
};

export type FilmsListPagination = {
  pageIndex?: number;
};

export type FilmsListFilters = FilmsListPagination &
  Partial<{
    type: string | null;
    style: string | null;
    genreIds: string[] | null;
    startDate: string | null;
    endDate: string | null;
    countryIds: string[] | null;
    studioIds: string[] | null;
    collectionId: string | null;
    actorId: string | null;
    awardId: string | null;
    crewMemberId: string | null;
    crewMemberPosition: string | null;
    rating: string | null;
    searchAnniversaries: boolean | null;
    searchLastVisitedFilms: boolean | null;
    ids: number[] | null;
  }>;

export type FilmsAdminListItem = Pick<Film, 'id' | 'title' | 'draft'>;

export type FilmsAdminListResponse = {
  films: FilmsAdminListItem[];
  total: number;
};
