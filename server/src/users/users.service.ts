import { UserRole } from 'src/common';
import { HASH_SALT_ROUNDS } from './constants';
import { IUsersService, UserEntity } from './types';
import { UsersModel } from './users.model';
import { hash } from 'bcrypt';
import { ObjectId } from 'mongoose';

class UsersService implements IUsersService {
  private usersModel: typeof UsersModel;

  constructor(usersModel: typeof UsersModel) {
    this.usersModel = usersModel;
  }

  getUser(userId: string | ObjectId) {
    return this.usersModel.findById(userId, { password: 0 });
  }

  async getUserByUsername(userName: string): Promise<UserEntity | null> {
    const user = await this.usersModel.findOne({ username: userName }).lean();

    return user;
  }

  async createUser(userEntity: Pick<UserEntity, 'username' | 'password'>) {
    const passwordHash = await hash(userEntity.password, HASH_SALT_ROUNDS);

    const createdUser = new this.usersModel({
      username: userEntity.username,
      password: passwordHash,
      role: UserRole.USER,
    });

    const user = await createdUser.save();

    return {
      id: user.id,
      username: user.username,
    };
  }
}

export { UsersService };
