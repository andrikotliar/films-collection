import { ObjectId } from 'mongoose';
import {
  Award,
  Country,
  Genre,
  PersonRole,
  Studio,
  TitleType,
  CollectionEnum,
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
  actorId: string;
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
  actorId?: string;
  comment?: string;
};

type AwardType = {
  awardId: Award;
  nominations: Nomination[];
};

type SeasonType = {
  title: string;
  number: number;
  episodesCount: number;
};

type SeriesExtension = {
  episodesTotal: number;
  seasons: SeasonType[];
};

type MediaItem = {
  poster: string;
  trailer: string;
};

type FilmData = {
  _id: ObjectId;
  type: TitleType[];
  media: MediaItem[];
  title: string;
  genres: Genre[];
  studios: Studio[];
  crew: Crew[];
  description: string[];
  countries: Country[];
  releaseDate: string[];
  duration: number;
  cast: CastType[];
  collections: Collection[];
  budget: number;
  boxOffice: number;
  awards: AwardType[];
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
  MediaItem,
  Person,
  Nomination,
};
