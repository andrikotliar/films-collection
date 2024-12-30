import { ObjectId } from 'mongoose';

export type Award = {
  _id: ObjectId;
  title: string;
  image: string;
  description: string;
  nominations: string[];
  createdAt: Date;
};
