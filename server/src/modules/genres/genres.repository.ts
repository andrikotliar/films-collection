import { PrismaClient } from '@prisma/client';

export class GenresRepository {
  constructor(private databaseClient: PrismaClient) {}

  getAll() {
    return this.databaseClient.genre.findMany({
      select: { id: true, title: true },
      orderBy: {
        title: 'asc',
      },
    });
  }
}
