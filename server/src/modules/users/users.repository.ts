import { PrismaClient, User } from '@prisma/client';

export class UsersRepository {
  constructor(private prismaClient: PrismaClient) {}

  findById(id: number) {
    return this.prismaClient.user.findUnique({
      where: {
        id,
        verified: true,
      },
      omit: {
        password: true,
      },
    });
  }

  findByUsernameWithPassword(username: string) {
    return this.prismaClient.user.findUnique({
      where: {
        username,
        verified: true,
      },
    });
  }

  create(data: Pick<User, 'username' | 'password'>) {
    return this.prismaClient.user.create({
      data,
    });
  }

  updateById(id: number, data: Partial<User>) {
    return this.prismaClient.user.update({
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
