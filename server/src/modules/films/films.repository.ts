import { Film, Prisma, PrismaClient } from '@prisma/client';

export class FilmsRepository {
  constructor(private prismaClient: PrismaClient) {}

  async count(filters: Prisma.FilmWhereInput) {
    return this.prismaClient.film.count({ where: filters });
  }

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

    const total = await this.count(filters);

    return { list, total };
  }

  findById(id: number) {
    return this.prismaClient.film.findUnique({
      select: {
        id: true,
        title: true,
        poster: true,
        releaseDate: true,
        description: true,
        duration: true,
        budget: true,
        boxOffice: true,
        rating: true,
        chapterKey: true,
        type: true,
        genres: {
          select: {
            genre: true,
          },
        },
        countries: {
          select: {
            country: true,
          },
        },
        studios: {
          select: {
            studio: true,
          },
        },
        seriesExtension: {
          select: {
            episodesTotal: true,
            seasonsTotal: true,
            seasons: true,
          },
        },
        crew: {
          select: {
            position: true,
            comment: true,
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
                image: true,
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
                image: true,
              },
            },
            nomination: {
              select: {
                id: true,
                title: true,
              },
            },
            comment: true,
            person: {
              select: {
                id: true,
                name: true,
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
        trailers: {
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
        genres: {
          select: {
            genre: true,
          },
        },
        releaseDate: true,
      },
      where: {
        title: {
          contains: query,
          mode: 'insensitive',
        },
      },
    });
  }

  findAnniversariesIdsRaw() {
    const currentDate = new Date();
    const date = currentDate.getDate();
    const month = currentDate.getMonth() + 1;

    return this.prismaClient.$queryRaw<
      Pick<Film, 'id'>[]
    >`SELECT id FROM films WHERE EXTRACT(MONTH FROM release_date) = ${month} AND EXTRACT(DAY FROM release_date) = ${date}`;
  }

  findChapters(chapterKey: string) {
    return this.prismaClient.film.findMany({
      where: {
        chapterKey,
      },
      select: {
        id: true,
        poster: true,
        title: true,
        chapterOrder: true,
      },
      orderBy: {
        chapterOrder: 'asc',
      },
    });
  }

  async findAndCountAdmin(
    filters: Prisma.FilmWhereInput,
    options: {
      limit: number;
      skip: number;
      orderBy: Prisma.FilmOrderByWithRelationInput;
    },
  ) {
    const total = await this.count(filters);
    const films = await this.prismaClient.film.findMany({
      select: {
        id: true,
        title: true,
        draft: true,
        poster: true,
      },
      where: filters,
      take: options.limit,
      skip: options.skip,
      orderBy: options.orderBy,
    });

    return { films, total };
  }
}
