import { ObjectId } from 'mongoose';
import {
  Award,
  Country,
  Genre,
  PersonRole,
  Studio,
  TitleType,
  Collection as CollectionEnum,
} from '../enums';

type Crew = {
  role: PersonRole;
  people: {
    name: string;
    comment?: string;
  }[];
};

type CastType = {
  actorId: string;
  character: {
    name: string;
    imageUrl?: string;
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
  series: SeriesExtension | null;
  rating: number;
  relatedTitlesKey?: string;
  watchCount: number;
  createdAt: string;
};

export type { FilmData };
