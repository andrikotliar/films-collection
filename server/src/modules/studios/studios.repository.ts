import { PrismaClient } from '@prisma/client';

export class StudiosRepository {
  constructor(private databaseClient: PrismaClient) {}

  getAll() {
    return this.databaseClient.studio.findMany({
      select: { id: true, title: true },
      orderBy: {
        title: 'asc',
      },
    });
  }
}
