import { model, Schema } from 'mongoose';
import {
  Award,
  AwardType,
  CastType,
  CollectionEnum,
  CollectionType,
  Country,
  Crew,
  FilmData,
  Genre,
  MediaItem,
  Nomination,
  Person,
  PersonRole,
  SeasonType,
  SeriesExtension,
  Studio,
  TitleType,
} from './common';
import { ActorModel } from '../actors/actors.model';
import { ChaptersModel } from '../chapters/chapters.model';

const FilmMediaSchema = new Schema<MediaItem>({
  poster: {
    type: String,
    required: true,
  },
  trailer: {
    type: String,
    required: true,
  },
});

const FilmPersonSchema = new Schema<Person>({
  name: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: false,
    default: null,
  },
});

const FilmCrewSchema = new Schema<Crew>({
  role: {
    type: String,
    enum: Object.values(PersonRole),
    required: true,
  },
  people: {
    type: [FilmPersonSchema],
    required: true,
  },
});

const CollectionSchema = new Schema<CollectionType>({
  key: {
    type: String,
    enum: Object.values(CollectionEnum),
  },
  order: {
    type: Number,
    required: false,
  },
});

const CastSchema = new Schema<CastType>({
  actorId: {
    type: String,
    required: true,
    ref: ActorModel,
  },
  character: {
    name: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: false,
    },
  },
});

const NominationSchema = new Schema<Nomination>({
  title: {
    type: String,
    required: true,
  },
  actorId: {
    type: String,
    required: false,
    ref: 'Actor',
  },
  comment: {
    type: String,
    required: false,
  },
});

const AwardSchema = new Schema<AwardType>({
  awardId: {
    type: String,
    enum: Object.values(Award),
    required: true,
  },
  nominations: [NominationSchema],
});

const SeasonSchema = new Schema<SeasonType>({
  title: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
    min: 1,
  },
  episodesCount: {
    type: Number,
    required: true,
    min: 1,
  },
});

const SeriesExtensionSchema = new Schema<SeriesExtension>({
  episodesTotal: {
    type: Number,
    required: true,
    min: 1,
  },
  seasons: {
    type: [SeasonSchema],
    required: true,
  },
});

const FilmsSchema = new Schema<FilmData>({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: [String],
    enum: Object.values(TitleType),
    required: true,
  },
  media: {
    type: [FilmMediaSchema],
    required: true,
  },
  genres: {
    type: [String],
    enum: Object.values(Genre),
    required: true,
  },
  studios: {
    type: [String],
    enum: Object.values(Studio),
    required: true,
  },
  countries: {
    type: [String],
    enum: Object.values(Country),
    required: true,
  },
  crew: {
    type: [FilmCrewSchema],
    required: true,
  },
  description: {
    type: [String],
    required: true,
  },
  releaseDate: {
    type: [String],
    required: true,
  },
  duration: {
    type: Number,
    required: true,
    default: 0,
  },
  cast: {
    type: [CastSchema],
    required: true,
  },
  collections: {
    type: [CollectionSchema],
    required: true,
  },
  budget: {
    type: Number,
    required: false,
    default: 0,
  },
  boxOffice: {
    type: Number,
    required: false,
    default: 0,
  },
  awards: {
    type: [AwardSchema],
    required: false,
    default: [],
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 3,
  },
  chaptersId: {
    type: String,
    required: false,
    ref: ChaptersModel,
  },
  watchCount: {
    type: Number,
    required: false,
    default: 0,
  },
  seriesExtension: {
    type: SeriesExtensionSchema,
    required: false,
    default: null,
  },
  createdAt: {
    type: Date,
    required: false,
    immutable: true,
    default: () => Date.now(),
  },
  updatedAt: {
    type: Date,
    required: false,
    immutable: true,
    default: () => Date.now(),
  },
});

const FilmsModel = model<FilmData>('Films', FilmsSchema);

export { FilmsModel };