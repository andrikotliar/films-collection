import { PrismaClient } from '@prisma/client';

export class StudiosRepository {
  constructor(private prismaClient: PrismaClient) {}

  getAll() {
    return this.prismaClient.studio.findMany({
      select: { id: true, title: true },
      orderBy: {
        title: 'asc',
      },
    });
  }
}
