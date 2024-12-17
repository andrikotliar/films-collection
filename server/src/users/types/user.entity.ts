import { ObjectId } from 'mongoose';
import { UserRole } from 'src/common';

type UserEntity = {
  _id: ObjectId;
  username: string;
  password: string;
  role: UserRole;
  refreshToken: string | null;
};

export type { UserEntity };
