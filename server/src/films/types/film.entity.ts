import { ObjectId } from 'mongoose';
import {
  Award,
  Country,
  Genre,
  PersonRole,
  Studio,
  TitleType,
  CollectionEnum,
  StyleType,
} from '../enums';

type Person = {
  name: string;
  comment: string | null;
};

type Crew = {
  role: PersonRole;
  people: Person[];
};

type CastType = {
  actor: string;
  character: {
    name: string;
    imageUrl: string | null;
  };
};

type Collection = {
  key: CollectionEnum;
  order?: number;
};

type Nomination = {
  title: string;
  actor?: string;
  comment?: string;
};

type AwardType = {
  awardKey: Award;
  nominations: Nomination[];
};

type SeasonType = {
  title: string;
  number: number;
  episodesCount: number;
  trailer: string;
  releaseDate: string;
};

type SeriesExtension = {
  episodesTotal: number;
  seasons: SeasonType[];
};

type FilmData = {
  _id: ObjectId;
  type: TitleType;
  style: StyleType;
  title: string;
  genres: Genre[];
  studios: Studio[];
  crew: Crew[];
  description: string[];
  countries: Country[];
  releaseDate: string;
  duration: number;
  cast: CastType[];
  collections: Collection[];
  budget: number | null;
  boxOffice: number | null;
  awards: AwardType[];
  poster: string;
  trailer: string | null;
  seriesExtension: SeriesExtension | null;
  rating: number;
  chaptersId?: string;
  watchCount: number;
  createdAt: Date;
  updatedAt: Date;
};

export type {
  FilmData,
  Crew,
  CastType,
  Collection as CollectionType,
  AwardType,
  SeriesExtension,
  SeasonType,
  Person,
  Nomination,
};
