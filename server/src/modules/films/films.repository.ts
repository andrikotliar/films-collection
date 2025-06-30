import { Film, Prisma, PrismaClient } from '@prisma/client';

export class FilmsRepository {
  constructor(private readonly databaseClient: PrismaClient) {}

  async count(filters: Prisma.FilmWhereInput) {
    return this.databaseClient.film.count({ where: filters });
  }

  async findAndCount(
    filters: Prisma.FilmWhereInput,
    limit: number,
    skip: number,
  ) {
    const list = await this.databaseClient.film.findMany({
      select: {
        id: true,
        title: true,
        poster: true,
        releaseDate: true,
      },
      where: filters,
      take: limit,
      skip,
      orderBy: [
        {
          releaseDate: 'desc',
        },
        { id: 'asc' },
      ],
    });

    const total = await this.count(filters);

    return { list, total };
  }

  findById(id: number) {
    return this.databaseClient.film.findUnique({
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
            finishedAt: true,
          },
        },
        castAndCrew: {
          select: {
            role: true,
            details: true,
            comment: true,
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

  findByIdAdmin(id: number) {
    return this.databaseClient.film.findUnique({
      where: {
        id,
      },
      select: {
        title: true,
        type: true,
        style: true,
        poster: true,
        rating: true,
        draft: true,
        budget: true,
        boxOffice: true,
        duration: true,
        releaseDate: true,
        description: true,
        chapterKey: true,
        chapterOrder: true,
        genres: {
          select: {
            genreId: true,
          },
        },
        countries: {
          select: {
            countryId: true,
          },
        },
        studios: {
          select: {
            studioId: true,
          },
        },
        collections: {
          select: {
            collectionId: true,
          },
        },
        trailers: {
          select: {
            videoId: true,
            order: true,
          },
        },
        crew: {
          select: {
            personId: true,
            person: {
              select: {
                name: true,
              },
            },
            position: true,
            comment: true,
          },
        },
        cast: {
          select: {
            personId: true,
            person: {
              select: {
                name: true,
              },
            },
          },
        },
        awards: {
          select: {
            awardId: true,
            nominationId: true,
            person: true,
            comment: true,
          },
        },
      },
    });
  }

  searchByTitle(query: string) {
    return this.databaseClient.film.findMany({
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

    return this.databaseClient.$queryRaw<
      Pick<Film, 'id'>[]
    >`SELECT id FROM films WHERE EXTRACT(MONTH FROM release_date) = ${month} AND EXTRACT(DAY FROM release_date) = ${date}`;
  }

  findChapters(chapterKey: string, filmId?: number) {
    const where: Prisma.FilmWhereInput = {
      chapterKey,
    };

    if (filmId) {
      where.id = {
        not: filmId,
      };
    }

    return this.databaseClient.film.findMany({
      where,
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
    const films = await this.databaseClient.film.findMany({
      select: {
        id: true,
        title: true,
        draft: true,
      },
      where: filters,
      take: options.limit,
      skip: options.skip,
      orderBy: [options.orderBy, { id: 'asc' }],
    });

    return { films, total };
  }

  updateBaseFilmData(id: number, input: Prisma.FilmUpdateInput) {
    return this.databaseClient.film.update({
      where: {
        id,
      },
      data: input,
    });
  }
}
