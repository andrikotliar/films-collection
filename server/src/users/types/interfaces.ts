import { UserEntity } from './user.entity';

interface IUsersService {
  getUser(
    userId: string,
  ): Promise<Pick<UserEntity, '_id' | 'username' | 'role'> | null>;
  getUserByUsername(userName: string): Promise<UserEntity | null>;
  createUser(
    payload: Pick<UserEntity, 'username' | 'password'>,
  ): Promise<{ id: string; username: string }>;
}

export { IUsersService };
