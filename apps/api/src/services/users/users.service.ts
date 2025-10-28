import { hash } from 'bcrypt';
import { User } from '@prisma/client';
import { HASH_SALT_ROUNDS, type Deps } from '~/common';
import type { UsersRepository } from '~/services/users/users.repository';

export class UsersService {
  private readonly usersRepository: UsersRepository;

  constructor(deps: Deps<'usersRepository'>) {
    this.usersRepository = deps.usersRepository;
  }

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
    });

    return {
      id: user.id,
      username: user.username,
    };
  }

  async setRefreshToken({ id, refreshToken }: Pick<User, 'id' | 'refreshToken'>) {
    return this.usersRepository.updateById(id, {
      refreshToken,
    });
  }
}
