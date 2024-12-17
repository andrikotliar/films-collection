import { model, Schema } from 'mongoose';
import { Chapter } from './types';

const ChapterSchema = new Schema<Chapter>({
  list: [
    {
      type: String,
      required: true,
    },
  ],
});

export const ChaptersModel = model<Chapter>('Chapters', ChapterSchema);
