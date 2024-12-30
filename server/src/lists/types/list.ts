import { ObjectId } from 'mongoose';
import { ListType } from '../enums';

export type List = {
  _id: ObjectId;
  type: ListType;
  values: string[];
  createdAt: Date;
};
