import { model, Schema } from 'mongoose';
import { ActorType } from './types';

const ActorSchema = new Schema<ActorType>({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: false,
    default: () => Date.now(),
  },
});

export const ActorModel = model<ActorType>('Actors', ActorSchema);
