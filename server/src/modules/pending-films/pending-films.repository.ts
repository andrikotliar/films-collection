import { PendingFilm, Prisma, PrismaClient } from '@prisma/client';

export class PendingFilmsRepository {
  constructor(private prismaClient: PrismaClient) {}

  async getListAndCount(args: Prisma.PendingFilmFindManyArgs) {
    const list = await this.prismaClient.pendingFilm.findMany(args);

    const total = await this.prismaClient.pendingFilm.count({
      where: args.where,
      take: args.take,
      skip: args.skip,
      orderBy: args.orderBy,
    });

    return { list, total };
  }

  create(
    data: Pick<PendingFilm, 'title' | 'priority' | 'collectionId' | 'rating'>,
  ) {
    return this.prismaClient.pendingFilm.create({ data });
  }

  deleteById(id: number) {
    return this.prismaClient.pendingFilm.delete({
      where: {
        id,
      },
      select: {
        id: true,
      },
    });
  }

  updateById(id: number, data: Partial<PendingFilm>) {
    return this.prismaClient.pendingFilm.update({
      where: { id },
      data,
    });
  }

  findPendingFilm(id: number) {
    return this.prismaClient.pendingFilm.findUnique({
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
