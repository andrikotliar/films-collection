import type { Film, Prisma } from '@prisma/client';
import { BaseRepository, type DatabaseClient, type Deps } from '~/shared';
import {
  PAGE_LIMITS,
  type CreateFilmInput,
  type GetFilmOptionsQuery,
  type NotNull,
} from '@films-collection/shared';

export class FilmsRepository extends BaseRepository {
  private readonly databaseClient: DatabaseClient;

  constructor(deps: Deps<'databaseService'>) {
    super(deps.databaseService);
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
        mostWatched: true,
        watchedInCinema: true,
        overview: true,
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
        mostWatched: true,
        watchedInCinema: true,
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
            url: true,
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
        poster: true,
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

  create(input: CreateFilmInput) {
    const {
      isDraft,
      castAndCrew,
      awards,
      genres,
      countries,
      studios,
      collections,
      trailers,
      releaseDate,
      description,
      seriesExtension,
      ...filmInput
    } = input;

    const data: Prisma.FilmCreateInput = {
      ...filmInput,
      releaseDate: new Date(releaseDate).toISOString(),
      draft: isDraft,
      overview: description,
    };

    if (castAndCrew.length) {
      data.castAndCrew = {
        create: castAndCrew,
      };
    }

    if (awards.length) {
      data.awards = {
        create: awards.map(({ personId, ...award }) => ({
          ...award,
          actorId: personId,
          comment: award.comment ?? null,
        })),
      };
    }

    if (genres.length) {
      data.genres = {
        create: genres.map((genreId) => ({ genreId })),
      };
    }

    if (countries.length) {
      data.countries = {
        create: countries.map((countryId) => ({ countryId })),
      };
    }

    if (studios.length) {
      data.studios = {
        create: studios.map((studioId) => ({ studioId })),
      };
    }

    if (collections.length) {
      data.collections = {
        create: collections.map((collectionId) => ({ collectionId })),
      };
    }

    if (trailers.length) {
      data.trailers = {
        create: trailers,
      };
    }

    if (seriesExtension) {
      data.seriesExtension = {
        create: {
          ...seriesExtension,
          finishedAt: seriesExtension.finishedAt
            ? new Date(seriesExtension.finishedAt).toISOString()
            : null,
        },
      };
    }

    return this.databaseClient.film.create({
      data,
    });
  }

  getEditableFilm(id: number) {
    return this.databaseClient.film.findUnique({
      where: {
        id,
      },
      select: {
        title: true,
        type: true,
        style: true,
        rating: true,
        poster: true,
        duration: true,
        releaseDate: true,
        budget: true,
        boxOffice: true,
        overview: true,
        chapterKey: true,
        chapterOrder: true,
        mostWatched: true,
        watchedInCinema: true,
        draft: true,
        genres: {
          select: {
            genreId: true,
          },
        },
        studios: {
          select: {
            studioId: true,
          },
        },
        countries: {
          select: {
            countryId: true,
          },
        },
        collections: {
          select: {
            collectionId: true,
          },
        },
        castAndCrew: {
          select: {
            personId: true,
            comment: true,
            role: true,
            details: true,
          },
        },
        awards: {
          select: {
            awardId: true,
            nominationId: true,
            comment: true,
            actorId: true,
          },
        },
        trailers: {
          select: {
            order: true,
            url: true,
          },
        },
        seriesExtension: true,
      },
    });
  }

  updateFilm(filmId: number, data: Prisma.FilmUpdateInput) {
    return this.databaseClient.film.update({
      where: {
        id: filmId,
      },
      data,
    });
  }

  async updateFilmAwards(filmId: number, data: CreateFilmInput['awards']) {
    await this.databaseClient.filmAwardNomination.deleteMany({ where: { filmId } });

    return () => {
      return this.databaseClient.filmAwardNomination.createMany({
        data: data.map((award) => ({
          ...award,
          actorId: award.personId,
          filmId,
        })),
      });
    };
  }

  async updateFilmStudios(filmId: number, data: CreateFilmInput['studios']) {
    await this.databaseClient.filmStudio.deleteMany({ where: { filmId } });

    return () => {
      return this.databaseClient.filmStudio.createMany({
        data: data.map((studioId) => ({
          studioId,
          filmId,
        })),
      });
    };
  }

  async updateFilmCountries(filmId: number, data: CreateFilmInput['countries']) {
    await this.databaseClient.filmCountry.deleteMany({ where: { filmId } });

    return () => {
      return this.databaseClient.filmCountry.createMany({
        data: data.map((countryId) => ({
          countryId,
          filmId,
        })),
      });
    };
  }

  async updateFilmCollections(filmId: number, data: CreateFilmInput['collections']) {
    await this.databaseClient.filmCollection.deleteMany({ where: { filmId } });

    return () => {
      return this.databaseClient.filmCollection.createMany({
        data: data.map((collectionId) => ({
          collectionId,
          filmId,
        })),
      });
    };
  }

  async updateFilmGenres(filmId: number, data: CreateFilmInput['genres']) {
    await this.databaseClient.filmGenre.deleteMany({ where: { filmId } });

    return () => {
      return this.databaseClient.filmGenre.createMany({
        data: data.map((genreId) => ({
          genreId,
          filmId,
        })),
      });
    };
  }

  async updateFilmTrailers(filmId: number, data: CreateFilmInput['trailers']) {
    await this.databaseClient.filmTrailer.deleteMany({ where: { filmId } });

    return () => {
      return this.databaseClient.filmTrailer.createMany({
        data: data.map((trailer) => ({
          ...trailer,
          filmId,
        })),
      });
    };
  }

  async updateFilmCastAndCrew(filmId: number, data: CreateFilmInput['castAndCrew']) {
    await this.databaseClient.filmPerson.deleteMany({ where: { filmId } });

    return () => {
      return this.databaseClient.filmPerson.createMany({
        data: data.map((person) => ({
          ...person,
          filmId,
        })),
      });
    };
  }

  updateSeriesExtension(
    filmId: number,
    data: Partial<NotNull<CreateFilmInput['seriesExtension']>>,
  ) {
    return this.databaseClient.seriesExtension.update({
      where: { filmId },
      data,
    });
  }
}
