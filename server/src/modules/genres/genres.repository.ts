import { PrismaClient } from '@prisma/client';

export class GenresRepository {
  constructor(private prismaClient: PrismaClient) {}

  getAll() {
    return this.prismaClient.genre.findMany({
      select: { id: true, title: true },
      orderBy: {
        title: 'asc',
      },
    });
  }
}
