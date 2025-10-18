import { PrismaClient, User } from '@prisma/client';

export class UsersRepository {
  constructor(private databaseClient: PrismaClient) {}

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
