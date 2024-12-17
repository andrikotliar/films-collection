import { model, Schema } from 'mongoose';
import { Award } from './types';

const AwardSchema = new Schema<Award>({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  nominations: {
    type: [String],
    required: true,
  },
});

export const AwardModel = model<Award>('Awards', AwardSchema);
