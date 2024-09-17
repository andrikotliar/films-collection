import { model, Schema } from 'mongoose';
import { Chapter } from './common';

const ChapterSchema = new Schema<Chapter>({
  list: [
    {
      type: String,
      required: true,
    },
  ],
});

const ChaptersModel = model<Chapter>('Chapters', ChapterSchema);

export { ChaptersModel };
