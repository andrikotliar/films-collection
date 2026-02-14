import type { User } from '@prisma/client';
import type { Deps } from '~/shared';

export class UsersRepository {
  constructor(private readonly deps: Deps<'databaseService'>) {}

  findById(id: number) {
    return this.deps.databaseService.user.findUnique({
      where: {
        id,
      },
      omit: {
        password: true,
      },
    });
  }

  findByUsernameWithPassword(username: string) {
    return this.deps.databaseService.user.findUnique({
      where: {
        username,
      },
    });
  }

  create(data: Pick<User, 'username' | 'password'>) {
    return this.deps.databaseService.user.create({
      data,
    });
  }

  updateById(id: number, data: Partial<User>) {
    return this.deps.databaseService.user.update({
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
