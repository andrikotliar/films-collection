import { ObjectId } from 'mongoose';

export type ActorType = {
  _id: ObjectId;
  name: string;
  image: string;
  createdAt: Date;
};
