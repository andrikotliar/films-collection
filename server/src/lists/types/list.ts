import { ObjectId } from 'mongoose';
import { ListType } from '../enums';

type List = {
  _id: ObjectId;
  type: ListType;
  values: string[];
};

export type { List };
