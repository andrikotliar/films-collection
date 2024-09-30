import { ObjectId } from 'mongoose';

type Chapter = {
  _id: ObjectId;
  list: string[];
};

export type { Chapter };
