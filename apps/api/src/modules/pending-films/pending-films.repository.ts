import { PendingFilm, Prisma, PrismaClient } from '@prisma/client';

export class PendingFilmsRepository {
  constructor(private databaseClient: PrismaClient) {}

  async getListAndCount(args: Prisma.PendingFilmFindManyArgs) {
    const list = await this.databaseClient.pendingFilm.findMany(args);

    const total = await this.databaseClient.pendingFilm.count({
      where: args.where,
    });

    return { list, total };
  }

  create(
    data: Pick<PendingFilm, 'title' | 'priority' | 'collectionId' | 'rating'>,
  ) {
    return this.databaseClient.pendingFilm.create({ data });
  }

  deleteById(id: number) {
    return this.databaseClient.pendingFilm.delete({
      where: {
        id,
      },
      select: {
        id: true,
      },
    });
  }

  updateById(id: number, data: Partial<PendingFilm>) {
    return this.databaseClient.pendingFilm.update({
      where: { id },
      data,
    });
  }

  findPendingFilm(id: number) {
    return this.databaseClient.pendingFilm.findUnique({
      select: {
        id: true,
        collectionId: true,
        title: true,
        rating: true,
      },
      where: {
        id,
      },
    });
  }
}
