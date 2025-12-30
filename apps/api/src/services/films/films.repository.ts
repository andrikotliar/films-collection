import type { Film, Prisma } from '@prisma/client';
import type { DatabaseClient, Deps } from '~/shared';
import { PAGE_LIMITS, type GetFilmOptionsQuery } from '@films-collection/shared';

export class FilmsRepository {
  private readonly databaseClient: DatabaseClient;

  constructor(deps: Deps<'databaseService'>) {
    this.databaseClient = deps.databaseService;
  }

  async count(filters?: Prisma.FilmWhereInput) {
    return this.databaseClient.film.count({ where: filters });
  }

  async findAndCount(filters: Prisma.FilmWhereInput, limit: number, skip: number) {
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
        duration: true,
        budget: true,
        boxOffice: true,
        rating: true,
        chapterKey: true,
        type: true,
        draft: true,
        chapterOrder: true,
        overview: {
          select: {
            text: true,
          },
        },
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
        watchCounter: {
          select: {
            realCounter: true,
            approxCounter: true,
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
        deletedAt: null,
      },
    });
  }

  findByIdAdmin(id: number) {
    return this.databaseClient.film.findUnique({
      where: {
        id,
        deletedAt: null,
      },
      select: {
        id: true,
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
        castAndCrew: {
          select: {
            role: true,
            details: true,
            comment: true,
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
        deletedAt: null,
      },
      take: PAGE_LIMITS.default,
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

  findChapters(chapterKey: string) {
    const where: Prisma.FilmWhereInput = {
      chapterKey,
      deletedAt: null,
    };

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
      take: PAGE_LIMITS.default,
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

  async getFilmsListByQuery({ q, selected }: GetFilmOptionsQuery) {
    const whereOptions: Prisma.FilmWhereInput = {
      deletedAt: null,
    };

    if (q) {
      whereOptions.title = {
        contains: q,
        mode: 'insensitive',
      };
    }

    if (selected) {
      whereOptions.id = {
        notIn: selected,
      };
    }

    const queryResult = await this.databaseClient.film.findMany({
      select: {
        id: true,
        title: true,
      },
      take: PAGE_LIMITS.default,
      where: whereOptions,
      orderBy: {
        title: 'asc',
      },
    });

    if (selected) {
      const selectedFilms = await this.databaseClient.film.findMany({
        select: {
          id: true,
          title: true,
        },
        where: {
          id: {
            in: selected,
          },
        },
      });

      return [...queryResult, ...selectedFilms];
    }

    return queryResult;
  }

  updateWatchCounter(filmId: number, value: number) {
    return this.databaseClient.filmWatchCount.update({
      where: {
        filmId,
      },
      data: {
        realCounter: value,
      },
    });
  }

  delete(id: number, date: Date) {
    return this.databaseClient.film.update({
      where: {
        id,
      },
      data: {
        deletedAt: date,
      },
    });
  }
}
