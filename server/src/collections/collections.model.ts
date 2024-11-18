import { model, Schema } from 'mongoose';
import { Collection } from './types';
import { CollectionType } from './enums';

const CollectionSchema = new Schema<Collection>({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: Object.values(CollectionType),
  },
  description: {
    type: String,
    required: false,
    default: null,
  },
});

const CollectionModel = model<Collection>('Collections', CollectionSchema);

export { CollectionModel };
