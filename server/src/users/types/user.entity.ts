import { ObjectId } from 'mongoose';
import { UserRole } from 'src/common';

export type UserEntity = {
  _id: ObjectId;
  username: string;
  password: string;
  role: UserRole;
  refreshToken: string | null;
};
