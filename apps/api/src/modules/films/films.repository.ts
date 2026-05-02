import { getFirstValue, getLatestEntriesFilter, sqlSearchQuery, type Deps } from '~/shared';
import {
  getSkipValue,
  PAGE_LIMITS,
  type CreateFilmDraftInput,
  type CreateFilmInput,
  type Enum,
  type ExtendedFilmStatus,
  type FilmStatus,
  type GetCompleteDataListQuery,
  type GetFilmOptionsQuery,
  type GetFilmsListQuery,
  type GetIncompleteFilmsQuery,
  type SortingOrder,
  type UpdateFilmInput,
} from '@films-collection/shared';
import { mapListFilters, type PlainFilmFilters } from '~/modules/films/helpers';
import {
  and,
  asc,
  count,
  desc,
  eq,
  exists,
  gt,
  ilike,
  inArray,
  isNotNull,
  isNull,
  lte,
  notInArray,
  sql,
  type SQL,
} from 'drizzle-orm';
import {
  collections,
  filmAwardNominations,
  films,
  filmsCollections,
  filmsCountries,
  filmsDrafts,
  filmsGenres,
  filmsPeople,
  filmsStudios,
  filmTrailers,
  genres,
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
  columns: { filmId: PgColumn; [key: string]: any };
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

  async countAddedFilms() {
    return this.count([eq(films.status, 'ADDED'), isNull(films.deletedAt)]);
  }

  async findAndCount(queries: GetFilmsListQuery) {
    const filters = mapListFilters(queries, this.deps.db);
    const sorting = this.mapSorting(queries.orderKey, queries.order);

    const list = await this.deps.db
      .select()
      .from(films)
      .where(and(...filters))
      .limit(PAGE_LIMITS.filmsList)
      .offset(getSkipValue('filmsList', queries.pageIndex))
      .orderBy(sorting, asc(films.id));

    const total = await this.count(filters);

    return { list, total };
  }

  findById(id: number, status: Enum<typeof FilmStatus> = 'ADDED') {
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
      where: and(eq(films.id, id), isNull(films.deletedAt), eq(films.status, status)),
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
      where: and(
        isNull(films.deletedAt),
        ilike(films.title, sqlSearchQuery(query)),
        eq(films.status, 'ADDED'),
      ),
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

  async getFilmsListByQuery({ q, selected }: GetFilmOptionsQuery) {
    const filters: SQL[] = [isNull(films.deletedAt)];

    if (q) {
      filters.push(ilike(films.title, sqlSearchQuery(q)));
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

  async softDelete(id: number, date: string) {
    await this.deps.db.update(films).set({ deletedAt: date }).where(eq(films.id, id));
  }

  async hardDelete(id: number) {
    await this.deps.db.delete(films).where(eq(films.id, id));
  }

  create(input: Omit<CreateFilmInput, 'tempDraftId'>) {
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
      const [newFilm] = await tr
        .insert(films)
        .values(filmInput)
        .returning({ id: films.id, status: films.status });

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

      return { filmId, status: newFilm.status };
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
            role: true,
            details: true,
          },
        },
        awards: {
          columns: {
            awardId: true,
            nominationId: true,
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
      trailers,
      ...filmParams
    } = data;

    return this.deps.db.transaction(async (transaction) => {
      const [updatedFilm] = await transaction
        .update(films)
        .set({ ...filmParams, updatedAt: new Date().toISOString() })
        .where(eq(films.id, filmId))
        .returning({ id: films.id, status: films.status });

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

      if (collections?.length) {
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

      if (countries?.length) {
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

      if (studios?.length) {
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

      if (trailers?.length) {
        await this.updateFilmRelations({
          transaction,
          filmId,
          table: filmTrailers,
          values: trailers.map((trailer) => ({
            ...trailer,
            filmId,
          })),
        });
      }

      if (seriesExtension) {
        await this.updateFilmRelations({
          transaction,
          filmId,
          table: seriesExtensions,
          values: [
            {
              ...seriesExtension,
              filmId,
            },
          ],
        });
      }

      return {
        filmId: updatedFilm.id,
        status: updatedFilm.status,
      };
    });
  }

  async updateFilmRelations<T extends PgTableWithColumns<AnyTable>, V extends PgInsertValue<T>>({
    transaction,
    filmId,
    table,
    values,
  }: UpdateRelationsParams<T, V>) {
    await transaction.delete(table).where(eq(table.filmId, filmId));

    await transaction.insert(table).values(values);
  }

  getCompleteData(queries: GetCompleteDataListQuery) {
    const filters: SQL[] = [eq(films.status, 'ADDED')];

    if (queries.intervalDays) {
      filters.push(getLatestEntriesFilter(films.updatedAt, queries.intervalDays));
    }

    return this.deps.db.query.films.findMany({
      where: and(...filters),
      orderBy: desc(films.updatedAt),
      columns: {
        id: true,
        title: true,
        releaseDate: true,
        duration: true,
        overview: true,
        budget: true,
        boxOffice: true,
        type: true,
        style: true,
        chapterKey: true,
        chapterOrder: true,
        poster: true,
      },
      with: {
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
        castAndCrew: {
          columns: {
            role: true,
            details: true,
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
          },
        },
        seriesExtensions: {
          columns: {
            id: true,
            episodesTotal: true,
            seasonsTotal: true,
            finishedAt: true,
          },
        },
        trailers: {
          columns: {
            id: true,
            url: true,
            order: true,
          },
        },
      },
    });
  }

  createDraft(filmId: string, input: CreateFilmDraftInput) {
    return getFirstValue(
      this.deps.db
        .insert(filmsDrafts)
        .values({
          filmId,
          content: input.content,
        })
        .returning(),
    );
  }

  updateDraft(id: number, content: Record<string, unknown>) {
    return getFirstValue(
      this.deps.db
        .update(filmsDrafts)
        .set({
          content,
        })
        .where(eq(filmsDrafts.id, id))
        .returning(),
    );
  }

  getDrafts(filmId: string) {
    return this.deps.db
      .select()
      .from(filmsDrafts)
      .where(eq(filmsDrafts.filmId, filmId))
      .orderBy(desc(filmsDrafts.updatedAt));
  }

  deleteDraft(id: number) {
    return this.deps.db.delete(filmsDrafts).where(eq(filmsDrafts.id, id));
  }

  deleteAllDraftsOfFilm(filmId: string) {
    return this.deps.db.delete(filmsDrafts).where(eq(filmsDrafts.filmId, filmId));
  }

  private transformIncompleteFilmsStatus(
    status: Enum<typeof ExtendedFilmStatus>,
  ): Partial<PlainFilmFilters> {
    const today = new Date().toISOString();

    if (status === 'UPCOMING') {
      return {
        status: 'PLANNED',
        startDateAfter: today,
      };
    }

    return {
      status,
      endDate: today,
    };
  }

  async getIncompleteFilmsByStatus({ status, ...query }: GetIncompleteFilmsQuery) {
    const transformedFilters = this.transformIncompleteFilmsStatus(status);

    const filters = mapListFilters({ ...query, ...transformedFilters }, this.deps.db);

    const list = await this.deps.db.query.films.findMany({
      columns: {
        id: true,
        title: true,
        poster: true,
        releaseDate: true,
        type: true,
        style: true,
        status: true,
        overview: true,
      },
      where: and(...filters),
      limit: PAGE_LIMITS.default,
      offset: getSkipValue('default', query.pageIndex),
      orderBy: [asc(films.createdAt), desc(films.id)],
      with: {
        trailers: {
          columns: {
            url: true,
            order: true,
          },
        },
        seriesExtensions: {
          columns: {
            seasonsTotal: true,
            episodesTotal: true,
            finishedAt: true,
          },
        },
        collections: {
          columns: {
            collectionId: true,
          },
        },
      },
    });

    const mappedList = list.map((item) => ({
      ...item,
      seriesExtension: item.seriesExtensions[0] ?? null,
    }));

    const count = await this.count(filters);

    return { list: mappedList, count };
  }

  getFilmStatus(id: number) {
    return getFirstValue(
      this.deps.db
        .select({ id: films.id, status: films.status })
        .from(films)
        .where(eq(films.id, id))
        .limit(1),
    );
  }

  getPlannedFilms() {
    const today = new Date().toISOString();

    return this.deps.db.query.films.findMany({
      columns: {
        id: true,
        title: true,
        overview: true,
      },
      with: {
        seriesExtensions: true,
      },
      where: and(eq(films.status, 'PLANNED'), lte(films.releaseDate, today)),
      limit: 10,
      orderBy: desc(films.releaseDate),
    });
  }

  async getUpcomingFilms() {
    const today = new Date().toISOString();

    return this.deps.db.query.films.findMany({
      columns: {
        id: true,
        title: true,
        releaseDate: true,
      },
      where: and(
        eq(films.status, 'PLANNED'),
        gt(films.releaseDate, today),
        isNotNull(films.releaseDate),
        exists(
          this.deps.db
            .select({ id: filmTrailers.id })
            .from(filmTrailers)
            .where(eq(filmTrailers.filmId, films.id)),
        ),
      ),
      limit: 10,
      orderBy: asc(films.releaseDate),
      with: {
        trailers: true,
      },
    });
  }

  async getLatestFilms() {
    return this.deps.db
      .select({ id: films.id, poster: films.poster, title: films.title })
      .from(films)
      .where(
        and(
          eq(films.status, 'ADDED'),
          isNotNull(films.poster),
          sql`LENGTH(poster) > 0`,
          isNull(films.deletedAt),
        ),
      )
      .limit(20)
      .orderBy(desc(films.createdAt));
  }

  findMonthAnniversaries() {
    return this.deps.db
      .select({
        id: films.id,
        poster: films.poster,
        releaseDate: films.releaseDate,
        title: films.title,
      })
      .from(films)
      .where(
        and(
          eq(films.status, 'ADDED'),
          isNotNull(films.releaseDate),
          isNull(films.deletedAt),
          sql`EXTRACT(MONTH FROM release_date) = EXTRACT(MONTH FROM CURRENT_DATE)`,
        ),
      )
      .limit(20)
      .orderBy(asc(films.releaseDate));
  }

  aggregateFilmGenres() {
    return this.deps.db
      .select({
        title: genres.title,
        id: genres.id,
        count: sql<string>`count(*)`,
      })
      .from(filmsGenres)
      .innerJoin(films, eq(films.id, filmsGenres.filmId))
      .innerJoin(genres, eq(genres.id, filmsGenres.genreId))
      .where(and(eq(films.status, 'ADDED'), isNull(films.deletedAt)))
      .groupBy(genres.id, genres.title);
  }

  aggregateFilmCollections() {
    return this.deps.db
      .select({
        title: collections.title,
        id: collections.id,
        count: sql<string>`count(*)`,
      })
      .from(filmsCollections)
      .innerJoin(films, eq(films.id, filmsCollections.filmId))
      .innerJoin(collections, eq(collections.id, filmsCollections.collectionId))
      .where(and(eq(films.status, 'ADDED'), isNull(films.deletedAt)))
      .groupBy(collections.id, collections.title);
  }

  private mapSorting(key: string = 'releaseDate', direction: SortingOrder = 'desc') {
    const directions = {
      asc,
      desc,
    };

    const fn = directions[direction];

    switch (key) {
      case 'title':
        return fn(films.title);
      case 'createdAt':
        return fn(films.createdAt);
      case 'releaseDate':
        return fn(films.releaseDate);
      default:
        return desc(films.updatedAt);
    }
  }
}
