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
});

const ListsModel = model<List>('Lists', ListSchema);

export { ListsModel };
