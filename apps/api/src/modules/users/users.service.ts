import { hash } from 'bcrypt';
import { User } from '@prisma/client';
import { UsersRepository } from '~/modules/users/users.repository';
import type { UserRefreshTokenPayload } from '~/modules/users/types';
import { HASH_SALT_ROUNDS } from '~/common';

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
    });

    return {
      id: user.id,
      username: user.username,
    };
  }

  async setRefreshToken({ id, refreshToken }: UserRefreshTokenPayload) {
    return this.usersRepository.updateById(id, {
      refreshToken,
    });
  }
}
