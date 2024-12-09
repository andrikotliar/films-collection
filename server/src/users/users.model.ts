import { model, Schema } from 'mongoose';
import { UserEntity } from './types/user.entity';
import { UserRole } from 'src/common';

const UserSchema = new Schema<UserEntity>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: Object.values(UserRole),
    required: true,
  },
});

const UsersModel = model('Users', UserSchema);

export { UsersModel };
