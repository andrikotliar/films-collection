import { model, Schema } from 'mongoose';
import { PendingFilmEntity } from './types';

const PendingFilmSchema = new Schema<PendingFilmEntity>({
  title: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: false,
    default: new Date(),
  },
});

const PendingFilmsModel = model<PendingFilmEntity>(
  'PendingFilms',
  PendingFilmSchema,
);

export { PendingFilmsModel };
