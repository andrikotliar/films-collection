import { model, Schema } from 'mongoose';
import { ActorType } from './common';

const ActorSchema = new Schema<ActorType>({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const ActorModel = model<ActorType>('Actors', ActorSchema);

export { ActorModel };
