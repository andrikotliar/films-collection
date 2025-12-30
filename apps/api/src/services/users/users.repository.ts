import type { User } from '@prisma/client';
import type { DatabaseClient, Deps } from '~/shared';

export class UsersRepository {
  private databaseClient: DatabaseClient;

  constructor(deps: Deps<'databaseService'>) {
    this.databaseClient = deps.databaseService;
  }

  findById(id: number) {
    return this.databaseClient.user.findUnique({
      where: {
        id,
      },
      omit: {
        password: true,
      },
    });
  }

  findByUsernameWithPassword(username: string) {
    return this.databaseClient.user.findUnique({
      where: {
        username,
      },
    });
  }

  create(data: Pick<User, 'username' | 'password'>) {
    return this.databaseClient.user.create({
      data,
    });
  }

  updateById(id: number, data: Partial<User>) {
    return this.databaseClient.user.update({
      where: {
        id,
      },
      data,
      select: {
        id: true,
        refreshToken: true,
      },
    });
  }
}
