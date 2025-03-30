import { hash } from 'bcrypt';
import { User } from '@prisma/client';
import { UsersRepository } from 'src/modules/users/users.repository';

export class UsersService {
  private hashSaltRounds = 10;

  constructor(private usersRepository: UsersRepository) {}

  getUser(userId: number) {
    return this.usersRepository.findById(userId);
  }

  async getUserByUsername(username: string) {
    return this.usersRepository.findByUsernameWithPassword(username);
  }

  async createUser(userInput: Pick<User, 'username' | 'password'>) {
    const passwordHash = await hash(userInput.password, this.hashSaltRounds);

    const user = await this.usersRepository.create({
      username: userInput.username,
      password: passwordHash,
    });

    return {
      id: user.id,
      username: user.username,
    };
  }

  async setRefreshToken(userId: number, token: string | null) {
    return this.usersRepository.updateById(userId, {
      refreshToken: token,
    });
  }
}
