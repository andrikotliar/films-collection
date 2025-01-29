import { Prisma, PrismaClient } from '@prisma/client';

export class FilmsRepository {
  constructor(private prismaClient: PrismaClient) {}

  async findAndCount(
    filters: Prisma.FilmWhereInput,
    limit: number,
    skip: number,
  ) {
    const list = await this.prismaClient.film.findMany({
      select: {
        id: true,
        title: true,
        poster: true,
        releaseDate: true,
      },
      where: filters,
      take: limit,
      skip,
      orderBy: {
        releaseDate: 'desc',
      },
    });

    const total = await this.prismaClient.film.count({ where: filters });

    return { list, total };
  }

  findById(id: number) {
    return this.prismaClient.film.findUnique({
      select: {
        publishStatus: false,
        createdAt: false,
        updatedAt: false,
        style: false,
        type: false,
        genres: true,
        countries: true,
        studios: true,
        crew: {
          select: {
            position: true,
            person: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        cast: {
          select: {
            characterName: true,
            characterImage: true,
            person: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        awards: {
          select: {
            award: {
              select: {
                id: true,
                title: true,
              },
            },
          },
        },
        collections: {
          select: {
            collection: {
              select: {
                id: true,
                title: true,
              },
            },
          },
        },
        chapters: {
          select: {
            film: {
              select: {
                id: true,
                title: true,
                poster: true,
              },
            },
          },
          orderBy: {
            order: 'asc',
          },
        },
      },
      where: {
        id,
      },
    });
  }

  searchByTitle(query: string) {
    return this.prismaClient.film.findMany({
      select: {
        id: true,
        title: true,
        poster: true,
        genres: true,
        releaseDate: true,
      },
      where: {
        title: {
          contains: query,
        },
      },
    });
  }

  findAnniversariesRaw(day: number, month: number) {
    return this.prismaClient
      .$queryRaw`SELECT id, title, release_date FROM film WHERE EXTRACT(MONTH FROM release_date) = ${month} AND EXTRACT(DAY FROM release_date) = ${day}`;
  }
}
