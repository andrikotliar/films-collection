import { model, Schema } from 'mongoose';
import {
  CastType,
  CollectionType,
  Crew,
  FilmAward,
  FilmData,
  Nomination,
  Person,
  SeasonType,
  SeriesExtension,
} from './types';
import { ActorModel } from '../actors/actors.model';
import { AwardModel } from '../awards/awards.model';
import { CollectionModel } from '../collections/collections.model';

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
    required: true,
  },
  people: {
    type: [FilmPersonSchema],
    required: true,
  },
});

const CollectionSchema = new Schema<CollectionType>({
  collection: {
    type: String,
    ref: CollectionModel,
  },
  order: {
    type: Number,
    required: false,
  },
});

const CastSchema = new Schema<CastType>({
  actor: {
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
  actor: {
    type: String,
    required: false,
    ref: ActorModel,
  },
  comment: {
    type: String,
    required: false,
  },
});

const AwardSchema = new Schema<FilmAward>({
  award: {
    type: String,
    required: true,
    ref: AwardModel,
  },
  nominations: [NominationSchema],
});

const SeasonSchema = new Schema<SeasonType>({
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
  releaseDate: {
    type: String,
    required: true,
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
    type: String,
    required: true,
  },
  style: {
    type: String,
    required: true,
  },
  genres: {
    type: [String],
    required: true,
  },
  studios: {
    type: [String],
    required: true,
  },
  countries: {
    type: [String],
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
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
    default: 0,
  },
  poster: {
    type: String,
    required: true,
  },
  trailers: {
    type: [String],
    required: true,
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
    default: null,
  },
  boxOffice: {
    type: Number,
    required: false,
    default: null,
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
