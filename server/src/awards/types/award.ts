import { ObjectId } from 'mongoose';

type Award = {
  _id: ObjectId;
  title: string;
  image: string;
  description: string;
  nominations: string[];
};

export type { Award };
