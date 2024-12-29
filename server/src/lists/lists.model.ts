import { model, Schema } from 'mongoose';
import { List } from './types';
import { ListType } from './enums';

const ListSchema = new Schema<List>({
  type: {
    type: String,
    required: true,
    enum: Object.values(ListType),
  },
  values: {
    type: [String],
    required: true,
  },
  createdAt: {
    type: Date,
    required: false,
    default: () => Date.now(),
  },
});

export const ListsModel = model<List>('Lists', ListSchema);
