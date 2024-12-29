import { ObjectId } from 'mongoose';
import { ListType } from '../enums';

type List = {
  _id: ObjectId;
  type: ListType;
  values: string[];
  createdAt: Date;
};

export type { List };
