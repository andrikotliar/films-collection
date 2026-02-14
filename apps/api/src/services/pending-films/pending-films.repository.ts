import type { PendingFilm, Prisma } from '@prisma/client';
import type { Deps } from '~/shared';

export class PendingFilmsRepository {
  constructor(private readonly deps: Deps<'databaseService'>) {}

  async getListAndCount(args: Prisma.PendingFilmFindManyArgs) {
    const list = await this.deps.databaseService.pendingFilm.findMany(args);

    const total = await this.deps.databaseService.pendingFilm.count({
      where: args.where,
    });

    return { list, total };
  }

  create(data: Pick<PendingFilm, 'title' | 'priority' | 'collectionId' | 'rating'>) {
    return this.deps.databaseService.pendingFilm.create({ data });
  }

  deleteById(id: number) {
    return this.deps.databaseService.pendingFilm.delete({
      where: {
        id,
      },
      select: {
        id: true,
      },
    });
  }

  updateById(id: number, data: Partial<PendingFilm>) {
    return this.deps.databaseService.pendingFilm.update({
      where: { id },
      data,
    });
  }

  findPendingFilm(id: number) {
    return this.deps.databaseService.pendingFilm.findUnique({
      select: {
        id: true,
        collectionId: true,
        title: true,
        rating: true,
        priority: true,
      },
      where: {
        id,
      },
    });
  }
}
