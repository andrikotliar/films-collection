import { PendingFilm, Prisma } from '@prisma/client';
import type { DatabaseClient, Deps } from '~/lib';

export class PendingFilmsRepository {
  private readonly databaseClient: DatabaseClient;

  constructor(deps: Deps<'databaseService'>) {
    this.databaseClient = deps.databaseService;
  }

  async getListAndCount(args: Prisma.PendingFilmFindManyArgs) {
    const list = await this.databaseClient.pendingFilm.findMany(args);

    const total = await this.databaseClient.pendingFilm.count({
      where: args.where,
    });

    return { list, total };
  }

  create(data: Pick<PendingFilm, 'title' | 'priority' | 'collectionId' | 'rating'>) {
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
