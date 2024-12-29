import { ObjectId } from 'mongoose';

type Chapter = {
  _id: ObjectId;
  list: string[];
  createdAt: Date;
};

export type { Chapter };
