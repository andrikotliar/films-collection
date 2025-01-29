import { HASH_SALT_ROUNDS } from './constants';
import { hash } from 'bcrypt';
import { User, UserRole } from '@prisma/client';
import { UsersRepository } from './users.repository';

export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  getUser(userId: number) {
    return this.usersRepository.findById(userId);
  }

  async getUserByUsername(username: string) {
    return this.usersRepository.findByUsernameWithPassword(username);
  }

  async createUser(userInput: Pick<User, 'username' | 'password'>) {
    const passwordHash = await hash(userInput.password, HASH_SALT_ROUNDS);

    const user = await this.usersRepository.create({
      username: userInput.username,
      password: passwordHash,
      role: UserRole.USER,
    });

    return {
      id: user.id,
      username: user.username,
    };
  }

  async setRefreshToken(userId: number, token: string) {
    return this.usersRepository.updateById(userId, {
      refreshToken: token,
    });
  }
}
