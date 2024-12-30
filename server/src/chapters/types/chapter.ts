import { ObjectId } from 'mongoose';

export type Chapter = {
  _id: ObjectId;
  list: string[];
  createdAt: Date;
};
