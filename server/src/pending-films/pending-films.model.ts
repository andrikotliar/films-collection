import { model, Schema } from 'mongoose';
import { PendingFilmEntity } from './types';

const PendingFilmSchema = new Schema<PendingFilmEntity>({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    required: false,
    default: () => Date.now(),
  },
  priority: {
    type: Number,
    required: false,
    default: 1,
    min: 1,
    max: 3,
  },
});

export const PendingFilmsModel = model<PendingFilmEntity>(
  'PendingFilms',
  PendingFilmSchema,
);
