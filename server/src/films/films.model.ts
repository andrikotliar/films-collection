import { model, ObjectId, Schema } from 'mongoose';

type Film = {
  _id: ObjectId;
  title: string;
};

const FilmsSchema = new Schema<Film>({
  title: {
    type: String,
    required: true,
  },
});

const FilmsModel = model<Film>('Films', FilmsSchema);

export { FilmsModel };
