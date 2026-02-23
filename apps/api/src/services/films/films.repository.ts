import { getFirstValue, type Deps } from '~/shared';
import {
  getSkipValue,
  PAGE_LIMITS,
  type CreateFilmInput,
  type GetAdminListQuery,
  type GetFilmOptionsQuery,
  type GetFilmsListQuery,
  type SortingOrder,
  type UpdateFilmInput,
} from '@films-collection/shared';
import { mapAdminListFilters, mapListFilters } from '~/services/films/helpers';
import {
  and,
  asc,
  count,
  desc,
  eq,
  ilike,
  inArray,
  isNull,
  notInArray,
  type SQL,
} from 'drizzle-orm';
import {
  filmAwardNominations,
  films,
  filmsCollections,
  filmsCountries,
  filmsGenres,
  filmsPeople,
  filmsStudios,
  filmTrailers,
  seriesExtensions,
} from '~/database/schema';
import type {
  PgColumn,
  PgInsertValue,
  PgTableWithColumns,
  PgTransaction,
} from 'drizzle-orm/pg-core';

type AnyTable = {
  name: string;
  columns: { id: PgColumn; [key: string]: any };
  schema: undefined;
  dialect: 'pg';
};

type UpdateRelationsParams<T extends PgTableWithColumns<AnyTable>, V extends PgInsertValue<T>> = {
  filmId: number;
  transaction: PgTransaction<any, any, any>;
  table: T;
  values: V[];
};

export class FilmsRepository {
  constructor(private readonly deps: Deps<'db'>) {}

  async count(filters?: SQL[]) {
    if (filters) {
      const result = await getFirstValue(
        this.deps.db
          .select({ count: count() })
          .from(films)
          .where(and(...filters)),
      );

      return result?.count ?? 0;
    }

    const result = await getFirstValue(this.deps.db.select({ count: count() }).from(films));

    return result?.count ?? 0;
  }

  async findAndCount(queries: GetFilmsListQuery) {
    const filters = mapListFilters(queries, this.deps.db);

    const list = await this.deps.db
      .select()
      .from(films)
      .where(and(...filters))
      .limit(PAGE_LIMITS.filmsList)
      .offset(getSkipValue('filmsList', queries.pageIndex))
      .orderBy(desc(films.releaseDate), asc(films.id));

    const total = await this.count(filters);

    return { list, total };
  }

  findById(id: number) {
    return this.deps.db.query.films.findFirst({
      columns: {
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
        overview: true,
      },
      with: {
        genres: {
          with: {
            genre: {
              columns: {
                id: true,
                title: true,
              },
            },
          },
        },
        countries: {
          with: {
            country: {
              columns: {
                id: true,
                title: true,
              },
            },
          },
        },
        studios: {
          with: {
            studio: {
              columns: {
                id: true,
                title: true,
              },
            },
          },
        },
        seriesExtensions: {
          columns: {
            seasonsTotal: true,
            episodesTotal: true,
            finishedAt: true,
          },
        },
        castAndCrew: {
          columns: {
            role: true,
            details: true,
            comment: true,
          },
          with: {
            person: {
              columns: {
                id: true,
                name: true,
              },
            },
          },
        },
        awards: {
          with: {
            award: {
              columns: {
                id: true,
                title: true,
              },
            },
            nomination: {
              columns: {
                id: true,
                title: true,
              },
            },
            person: {
              columns: {
                id: true,
                name: true,
              },
            },
          },
          columns: {
            comment: true,
          },
        },
        collections: {
          with: {
            collection: {
              columns: {
                id: true,
                title: true,
              },
            },
          },
        },
        trailers: {
          orderBy: asc(filmTrailers.order),
        },
      },
      where: and(eq(films.id, id), isNull(films.deletedAt)),
    });
  }

  findByIdAdmin(id: number) {
    return this.deps.db.query.films.findFirst({
      where: and(eq(films.id, id), isNull(films.deletedAt)),
      columns: {
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
      },
      with: {
        genres: {
          columns: {
            genreId: true,
          },
        },
        countries: {
          columns: {
            countryId: true,
          },
        },
        studios: {
          columns: {
            studioId: true,
          },
        },
        collections: {
          columns: {
            collectionId: true,
          },
        },
        trailers: {
          columns: {
            url: true,
            order: true,
          },
        },
        castAndCrew: {
          columns: {
            role: true,
            details: true,
            comment: true,
          },
          with: {
            person: {
              columns: {
                id: true,
                name: true,
              },
            },
          },
        },
        awards: {
          columns: {
            awardId: true,
            nominationId: true,
            comment: true,
          },
          with: {
            person: true,
          },
        },
      },
    });
  }

  searchByTitle(query: string) {
    return this.deps.db.query.films.findMany({
      columns: {
        id: true,
        title: true,
        poster: true,
        releaseDate: true,
      },
      with: {
        genres: {
          with: {
            genre: true,
          },
        },
      },
      where: and(isNull(films.deletedAt), ilike(films.title, query)),
      limit: PAGE_LIMITS.default,
    });
  }

  findChapters(chapterKey: string) {
    return this.deps.db
      .select({
        id: films.id,
        poster: films.poster,
        title: films.title,
        chapterOrder: films.chapterOrder,
      })
      .from(films)
      .where(and(isNull(films.deletedAt), eq(films.chapterKey, chapterKey)))
      .orderBy(asc(films.chapterOrder));
  }

  async findAndCountAdmin(queries: GetAdminListQuery) {
    const filters = mapAdminListFilters(queries);

    const total = await this.count(filters);

    const list = await this.deps.db
      .select({
        id: films.id,
        title: films.title,
        draft: films.draft,
        poster: films.poster,
      })
      .from(films)
      .where(and(...filters))
      .limit(PAGE_LIMITS.default)
      .offset(getSkipValue('default', queries.pageIndex))
      .orderBy(this.mapSorting(queries.orderKey, queries.order), asc(films.id));

    return { list, total };
  }

  async getFilmsListByQuery({ q, selected }: GetFilmOptionsQuery) {
    const filters: SQL[] = [isNull(films.deletedAt)];

    if (q) {
      filters.push(ilike(films.title, q));
    }

    if (selected) {
      filters.push(notInArray(films.id, selected));
    }

    const queryResult = await this.deps.db
      .select({ id: films.id, title: films.title })
      .from(films)
      .where(and(...filters))
      .limit(PAGE_LIMITS.default)
      .orderBy(asc(films.title));

    if (selected) {
      const selectedFilms = await this.deps.db
        .select({ id: films.id, title: films.title })
        .from(films)
        .where(inArray(films.id, selected));

      return [...queryResult, ...selectedFilms];
    }

    return queryResult;
  }

  async delete(id: number, date: string) {
    await this.deps.db.update(films).set({ deletedAt: date }).where(eq(films.id, id));
  }

  create(input: Omit<CreateFilmInput, 'pendingFilmId'>) {
    const {
      castAndCrew,
      awards,
      genres,
      countries,
      studios,
      collections,
      trailers,
      seriesExtension,
      ...filmInput
    } = input;

    return this.deps.db.transaction(async (tr) => {
      const [newFilm] = await tr.insert(films).values(filmInput).returning({ id: films.id });

      const filmId = newFilm.id;

      if (castAndCrew.length) {
        const values = castAndCrew.map((person) => ({
          ...person,
          filmId,
        }));
        await tr.insert(filmsPeople).values(values);
      }

      if (awards.length) {
        const values = awards.map((award) => ({ ...award, filmId }));

        await tr.insert(filmAwardNominations).values(values);
      }

      if (genres.length) {
        const values = genres.map((genreId) => ({ genreId, filmId }));

        await tr.insert(filmsGenres).values(values);
      }

      if (countries.length) {
        const values = countries.map((countryId) => ({ countryId, filmId }));

        await tr.insert(filmsCountries).values(values);
      }

      if (studios.length) {
        const values = studios.map((studioId) => ({ studioId, filmId }));

        await tr.insert(filmsStudios).values(values);
      }

      if (collections.length) {
        const values = collections.map((collectionId) => ({ collectionId, filmId }));

        await tr.insert(filmsCollections).values(values);
      }

      if (trailers.length) {
        const values = trailers.map((trailer) => ({ ...trailer, filmId }));
        await tr.insert(filmTrailers).values(values);
      }

      if (seriesExtension) {
        await tr.insert(seriesExtensions).values({
          ...seriesExtension,
          filmId,
        });
      }

      return filmId;
    });
  }

  getEditableFilm(id: number) {
    return this.deps.db.query.films.findFirst({
      where: eq(films.id, id),
      columns: {
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
        draft: true,
      },
      with: {
        genres: {
          columns: {
            genreId: true,
          },
        },
        studios: {
          columns: {
            studioId: true,
          },
        },
        countries: {
          columns: {
            countryId: true,
          },
        },
        collections: {
          columns: {
            collectionId: true,
          },
        },
        castAndCrew: {
          columns: {
            personId: true,
            comment: true,
            role: true,
            details: true,
          },
        },
        awards: {
          columns: {
            awardId: true,
            nominationId: true,
            comment: true,
            actorId: true,
          },
        },
        trailers: {
          columns: {
            order: true,
            url: true,
          },
        },
        seriesExtensions: true,
      },
    });
  }

  updateFilm(filmId: number, data: UpdateFilmInput) {
    const {
      castAndCrew,
      awards,
      genres,
      collections,
      countries,
      studios,
      seriesExtension,
      ...filmParams
    } = data;

    return this.deps.db.transaction(async (transaction) => {
      if (Object.keys(filmParams).length) {
        await transaction.update(films).set(filmParams).where(eq(films.id, filmId));
      }

      if (genres?.length) {
        await this.updateFilmRelations({
          transaction,
          filmId,
          table: filmsGenres,
          values: genres.map((genreId) => ({
            genreId,
            filmId,
          })),
        });
      }

      if (castAndCrew?.length) {
        await this.updateFilmRelations({
          transaction,
          filmId,
          table: filmsPeople,
          values: castAndCrew.map((person) => ({
            ...person,
            filmId,
          })),
        });
      }

      if (awards?.length) {
        await this.updateFilmRelations({
          transaction,
          filmId,
          table: filmAwardNominations,
          values: awards.map((award) => ({
            ...award,
            filmId,
          })),
        });
      }

      if (collections) {
        await this.updateFilmRelations({
          transaction,
          filmId,
          table: filmsCollections,
          values: collections.map((collectionId) => ({
            collectionId,
            filmId,
          })),
        });
      }

      if (countries) {
        await this.updateFilmRelations({
          transaction,
          filmId,
          table: filmsCountries,
          values: countries.map((countryId) => ({
            countryId,
            filmId,
          })),
        });
      }

      if (studios) {
        await this.updateFilmRelations({
          transaction,
          filmId,
          table: filmsStudios,
          values: studios.map((studioId) => ({
            studioId,
            filmId,
          })),
        });
      }

      if (seriesExtension) {
        await this.deps.db
          .update(seriesExtensions)
          .set(seriesExtension)
          .where(eq(seriesExtensions.filmId, filmId));
      }
    });
  }

  async updateFilmRelations<T extends PgTableWithColumns<AnyTable>, V extends PgInsertValue<T>>({
    transaction,
    filmId,
    table,
    values,
  }: UpdateRelationsParams<T, V>) {
    await transaction.delete(table).where(eq(table.id, filmId));

    await transaction.insert(table).values(values);
  }

  private mapSorting(key: string = 'createdAt', direction: SortingOrder = 'desc') {
    const directions = {
      asc,
      desc,
    };

    const fn = directions[direction];

    switch (key) {
      case 'title':
        return fn(films.title);
      default:
        return desc(films.createdAt);
    }
  }
}
