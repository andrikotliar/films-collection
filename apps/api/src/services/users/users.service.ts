import { hash } from 'bcrypt';
import type { User } from '@prisma/client';
import { HASH_SALT_ROUNDS, type Deps } from '~/shared';

export class UsersService {
  constructor(private readonly deps: Deps<'usersRepository'>) {}

  getUser(userId: number) {
    return this.deps.usersRepository.findById(userId);
  }

  async getUserByUsername(username: string) {
    return this.deps.usersRepository.findByUsernameWithPassword(username);
  }

  async createUser(userInput: Pick<User, 'username' | 'password'>) {
    const passwordHash = await hash(userInput.password, HASH_SALT_ROUNDS);

    const user = await this.deps.usersRepository.create({
      username: userInput.username,
      password: passwordHash,
    });

    return {
      id: user.id,
      username: user.username,
    };
  }

  async setRefreshToken({ id, refreshToken }: Pick<User, 'id' | 'refreshToken'>) {
    return this.deps.usersRepository.updateById(id, {
      refreshToken,
    });
  }
}
