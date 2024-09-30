import { ObjectId } from 'mongoose';

type ActorType = {
  _id: ObjectId;
  name: string;
  image: string;
};

export type { ActorType };
