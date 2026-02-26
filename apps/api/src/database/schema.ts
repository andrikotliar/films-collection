import {
  pgTable,
  index,
  foreignKey,
  serial,
  text,
  date,
  integer,
  bigint,
  timestamp,
  boolean,
  uniqueIndex,
  pgEnum,
  numeric,
} from 'drizzle-orm/pg-core';

export const collectionCategory = pgEnum('collection_category', [
  'GENERAL',
  'CINEMATIC_UNIVERSE',
  'TOP',
]);
export const personRole = pgEnum('person_role', [
  'DIRECTOR',
  'WRITER',
  'PRODUCER',
  'COMPOSER',
  'CAMERAMAN',
  'CREATOR',
  'ACTOR',
]);
export const titleStyle = pgEnum('title_style', ['LIVE_ACTION', 'ANIMATION']);
export const titleType = pgEnum('title_type', ['FILM', 'SERIES']);

export const films = pgTable(
  'films',
  {
    id: serial().primaryKey().notNull(),
    title: text().notNull(),
    type: titleType().default('FILM').notNull(),
    style: titleStyle().default('LIVE_ACTION').notNull(),
    releaseDate: date('release_date').notNull(),
    duration: integer().default(0).notNull(),
    poster: text(),
    budget: bigint({ mode: 'number' }).default(0).notNull(),
    boxOffice: bigint('box_office', { mode: 'number' }).default(0).notNull(),
    rating: integer().default(1).notNull(),
    chapterKey: text('chapter_key'),
    chapterOrder: numeric('chapter_order'),
    createdAt: timestamp('created_at', { precision: 3, mode: 'string' })
      .defaultNow()
      .$onUpdate(() => new Date().toISOString())
      .notNull(),
    updatedAt: timestamp('updated_at', { precision: 3, mode: 'string' })
      .defaultNow()
      .$onUpdate(() => new Date().toISOString())
      .notNull(),
    draft: boolean().default(false).notNull(),
    deletedAt: timestamp({ precision: 3, mode: 'string' }),
    overview: text(),
  },
  (table) => [
    index('films_title_idx').using('btree', table.title.asc().nullsLast().op('text_ops')),
    foreignKey({
      columns: [table.chapterKey],
      foreignColumns: [filmChapterKeys.key],
      name: 'films_chapter_key_fkey',
    })
      .onUpdate('cascade')
      .onDelete('set null'),
  ],
);

export const awards = pgTable(
  'awards',
  {
    id: serial().primaryKey().notNull(),
    title: text().notNull(),
    description: text(),
    createdAt: timestamp('created_at', { precision: 3, mode: 'string' })
      .defaultNow()
      .$onUpdate(() => new Date().toISOString())
      .notNull(),
    updatedAt: timestamp('updated_at', { precision: 3, mode: 'string' })
      .defaultNow()
      .$onUpdate(() => new Date().toISOString())
      .notNull(),
  },
  (table) => [
    uniqueIndex('awards_title_key').using('btree', table.title.asc().nullsLast().op('text_ops')),
  ],
);

export const collections = pgTable(
  'collections',
  {
    id: serial().primaryKey().notNull(),
    title: text().notNull(),
    description: text(),
    category: collectionCategory().default('GENERAL').notNull(),
    createdAt: timestamp('created_at', { precision: 3, mode: 'string' })
      .defaultNow()
      .$onUpdate(() => new Date().toISOString())
      .notNull(),
    updatedAt: timestamp('updated_at', { precision: 3, mode: 'string' })
      .defaultNow()
      .$onUpdate(() => new Date().toISOString())
      .notNull(),
  },
  (table) => [
    uniqueIndex('collections_title_key').using(
      'btree',
      table.title.asc().nullsLast().op('text_ops'),
    ),
  ],
);

export const collectionEvents = pgTable(
  'collection_events',
  {
    id: serial().primaryKey().notNull(),
    title: text().notNull(),
    collectionId: integer('collection_id').notNull(),
    createdAt: timestamp('created_at', { precision: 3, mode: 'string' })
      .defaultNow()
      .$onUpdate(() => new Date().toISOString())
      .notNull(),
    updatedAt: timestamp('updated_at', { precision: 3, mode: 'string' })
      .defaultNow()
      .$onUpdate(() => new Date().toISOString())
      .notNull(),
    yearFrom: integer('year_from').default(0).notNull(),
    titleFilmId: integer('title_film_id').notNull(),
    startDateCode: integer('start_date_code').notNull(),
    endDateCode: integer('end_date_code').notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.titleFilmId],
      foreignColumns: [films.id],
      name: 'collection_events_title_film_id_fkey',
    })
      .onUpdate('cascade')
      .onDelete('restrict'),
    foreignKey({
      columns: [table.collectionId],
      foreignColumns: [collections.id],
      name: 'collection_events_collection_id_fkey',
    })
      .onUpdate('cascade')
      .onDelete('restrict'),
  ],
);

export const filmsCollections = pgTable(
  'films_collections',
  {
    id: serial().primaryKey().notNull(),
    filmId: integer('film_id').notNull(),
    collectionId: integer('collection_id').notNull(),
    order: integer(),
    createdAt: timestamp('created_at', { precision: 3, mode: 'string' })
      .defaultNow()
      .$onUpdate(() => new Date().toISOString())
      .notNull(),
    updatedAt: timestamp('updated_at', { precision: 3, mode: 'string' })
      .defaultNow()
      .$onUpdate(() => new Date().toISOString())
      .notNull(),
  },
  (table) => [
    uniqueIndex('films_collections_film_id_collection_id_key').using(
      'btree',
      table.filmId.asc().nullsLast().op('int4_ops'),
      table.collectionId.asc().nullsLast().op('int4_ops'),
    ),
    foreignKey({
      columns: [table.filmId],
      foreignColumns: [films.id],
      name: 'films_collections_film_id_fkey',
    })
      .onUpdate('cascade')
      .onDelete('cascade'),
    foreignKey({
      columns: [table.collectionId],
      foreignColumns: [collections.id],
      name: 'films_collections_collection_id_fkey',
    })
      .onUpdate('cascade')
      .onDelete('cascade'),
  ],
);

export const pendingFilms = pgTable(
  'pending_films',
  {
    id: serial().primaryKey().notNull(),
    title: text().notNull(),
    priority: integer().default(1).notNull(),
    createdAt: timestamp('created_at', { precision: 3, mode: 'string' })
      .defaultNow()
      .$onUpdate(() => new Date().toISOString())
      .notNull(),
    updatedAt: timestamp('updated_at', { precision: 3, mode: 'string' })
      .defaultNow()
      .$onUpdate(() => new Date().toISOString())
      .notNull(),
    collectionId: integer(),
    rating: integer(),
  },
  (table) => [
    foreignKey({
      columns: [table.collectionId],
      foreignColumns: [collections.id],
      name: 'pending_films_collectionId_fkey',
    })
      .onUpdate('cascade')
      .onDelete('set null'),
  ],
);

export const filmTrailers = pgTable(
  'film_trailers',
  {
    id: serial().primaryKey().notNull(),
    order: integer().notNull(),
    filmId: integer('film_id').notNull(),
    createdAt: timestamp('created_at', { precision: 3, mode: 'string' })
      .defaultNow()
      .$onUpdate(() => new Date().toISOString())
      .notNull(),
    updatedAt: timestamp('updated_at', { precision: 3, mode: 'string' })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date().toISOString()),
    url: text().notNull(),
  },
  (table) => [
    uniqueIndex('film_trailers_film_id_url_key').using(
      'btree',
      table.filmId.asc().nullsLast().op('int4_ops'),
      table.url.asc().nullsLast().op('int4_ops'),
    ),
    foreignKey({
      columns: [table.filmId],
      foreignColumns: [films.id],
      name: 'film_trailers_film_id_fkey',
    })
      .onUpdate('cascade')
      .onDelete('cascade'),
  ],
);

export const countries = pgTable(
  'countries',
  {
    id: serial().primaryKey().notNull(),
    title: text().notNull(),
    createdAt: timestamp('created_at', { precision: 3, mode: 'string' })
      .defaultNow()
      .$onUpdate(() => new Date().toISOString())
      .notNull(),
    updatedAt: timestamp('updated_at', { precision: 3, mode: 'string' })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date().toISOString()),
  },
  (table) => [
    uniqueIndex('countries_title_key').using('btree', table.title.asc().nullsLast().op('text_ops')),
  ],
);

export const filmAwardNominations = pgTable(
  'film_award_nominations',
  {
    id: serial().primaryKey().notNull(),
    awardId: integer('award_id').notNull(),
    nominationId: integer('nomination_id').notNull(),
    filmId: integer('film_id').notNull(),
    comment: text(),
    actorId: integer('actor_id'),
    createdAt: timestamp('created_at', { precision: 3, mode: 'string' })
      .defaultNow()
      .$onUpdate(() => new Date().toISOString())
      .notNull(),
    updatedAt: timestamp('updated_at', { precision: 3, mode: 'string' })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date().toISOString()),
  },
  (table) => [
    uniqueIndex('film_award_nominations_award_id_film_id_nomination_id_key').using(
      'btree',
      table.awardId.asc().nullsLast().op('int4_ops'),
      table.filmId.asc().nullsLast().op('int4_ops'),
      table.nominationId.asc().nullsLast().op('int4_ops'),
    ),
    foreignKey({
      columns: [table.awardId],
      foreignColumns: [awards.id],
      name: 'film_award_nominations_award_id_fkey',
    })
      .onUpdate('cascade')
      .onDelete('cascade'),
    foreignKey({
      columns: [table.nominationId],
      foreignColumns: [nominations.id],
      name: 'film_award_nominations_nomination_id_fkey',
    })
      .onUpdate('cascade')
      .onDelete('cascade'),
    foreignKey({
      columns: [table.filmId],
      foreignColumns: [films.id],
      name: 'film_award_nominations_film_id_fkey',
    })
      .onUpdate('cascade')
      .onDelete('cascade'),
    foreignKey({
      columns: [table.actorId],
      foreignColumns: [people.id],
      name: 'film_award_nominations_actor_id_fkey',
    })
      .onUpdate('cascade')
      .onDelete('cascade'),
  ],
);

export const filmChapterKeys = pgTable('film_chapter_keys', {
  key: text().primaryKey().notNull(),
  createdAt: timestamp('created_at', { precision: 3, mode: 'string' })
    .defaultNow()
    .$onUpdate(() => new Date().toISOString())
    .notNull(),
  updatedAt: timestamp('updated_at', { precision: 3, mode: 'string' })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date().toISOString()),
});

export const filmsCountries = pgTable(
  'films_countries',
  {
    id: serial().primaryKey().notNull(),
    filmId: integer('film_id').notNull(),
    countryId: integer('country_id').notNull(),
    createdAt: timestamp('created_at', { precision: 3, mode: 'string' })
      .defaultNow()
      .$onUpdate(() => new Date().toISOString())
      .notNull(),
    updatedAt: timestamp('updated_at', { precision: 3, mode: 'string' })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date().toISOString()),
  },
  (table) => [
    uniqueIndex('films_countries_film_id_country_id_key').using(
      'btree',
      table.filmId.asc().nullsLast().op('int4_ops'),
      table.countryId.asc().nullsLast().op('int4_ops'),
    ),
    foreignKey({
      columns: [table.filmId],
      foreignColumns: [films.id],
      name: 'films_countries_film_id_fkey',
    })
      .onUpdate('cascade')
      .onDelete('cascade'),
    foreignKey({
      columns: [table.countryId],
      foreignColumns: [countries.id],
      name: 'films_countries_country_id_fkey',
    })
      .onUpdate('cascade')
      .onDelete('cascade'),
  ],
);

export const filmsGenres = pgTable(
  'films_genres',
  {
    id: serial().primaryKey().notNull(),
    filmId: integer('film_id').notNull(),
    genreId: integer('genre_id').notNull(),
    createdAt: timestamp('created_at', { precision: 3, mode: 'string' })
      .defaultNow()
      .$onUpdate(() => new Date().toISOString())
      .notNull(),
    updatedAt: timestamp('updated_at', { precision: 3, mode: 'string' })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date().toISOString()),
  },
  (table) => [
    uniqueIndex('films_genres_film_id_genre_id_key').using(
      'btree',
      table.filmId.asc().nullsLast().op('int4_ops'),
      table.genreId.asc().nullsLast().op('int4_ops'),
    ),
    foreignKey({
      columns: [table.filmId],
      foreignColumns: [films.id],
      name: 'films_genres_film_id_fkey',
    })
      .onUpdate('cascade')
      .onDelete('cascade'),
    foreignKey({
      columns: [table.genreId],
      foreignColumns: [genres.id],
      name: 'films_genres_genre_id_fkey',
    })
      .onUpdate('cascade')
      .onDelete('cascade'),
  ],
);

export const filmsStudios = pgTable(
  'films_studios',
  {
    id: serial().primaryKey().notNull(),
    filmId: integer('film_id').notNull(),
    studioId: integer('studio_id').notNull(),
    createdAt: timestamp('created_at', { precision: 3, mode: 'string' })
      .defaultNow()
      .$onUpdate(() => new Date().toISOString())
      .notNull(),
    updatedAt: timestamp('updated_at', { precision: 3, mode: 'string' })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date().toISOString()),
  },
  (table) => [
    uniqueIndex('films_studios_film_id_studio_id_key').using(
      'btree',
      table.filmId.asc().nullsLast().op('int4_ops'),
      table.studioId.asc().nullsLast().op('int4_ops'),
    ),
    foreignKey({
      columns: [table.filmId],
      foreignColumns: [films.id],
      name: 'films_studios_film_id_fkey',
    })
      .onUpdate('cascade')
      .onDelete('cascade'),
    foreignKey({
      columns: [table.studioId],
      foreignColumns: [studios.id],
      name: 'films_studios_studio_id_fkey',
    })
      .onUpdate('cascade')
      .onDelete('cascade'),
  ],
);

export const genres = pgTable(
  'genres',
  {
    id: serial().primaryKey().notNull(),
    title: text().notNull(),
    createdAt: timestamp('created_at', { precision: 3, mode: 'string' })
      .defaultNow()
      .$onUpdate(() => new Date().toISOString())
      .notNull(),
    updatedAt: timestamp('updated_at', { precision: 3, mode: 'string' })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date().toISOString()),
  },
  (table) => [
    uniqueIndex('genres_title_key').using('btree', table.title.asc().nullsLast().op('text_ops')),
  ],
);

export const nominations = pgTable(
  'nominations',
  {
    id: serial().primaryKey().notNull(),
    title: text().notNull(),
    awardId: integer('award_id')
      .notNull()
      .references(() => awards.id),
    shouldIncludeActor: boolean('should_include_actor').default(false).notNull(),
    createdAt: timestamp('created_at', { precision: 3, mode: 'string' })
      .defaultNow()
      .$onUpdate(() => new Date().toISOString())
      .notNull(),
    updatedAt: timestamp('updated_at', { precision: 3, mode: 'string' })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date().toISOString()),
  },
  (table) => [
    uniqueIndex('nominations_award_id_title_key').using(
      'btree',
      table.awardId.asc().nullsLast().op('int4_ops'),
      table.title.asc().nullsLast().op('int4_ops'),
    ),
    foreignKey({
      columns: [table.awardId],
      foreignColumns: [awards.id],
      name: 'nominations_award_id_fkey',
    })
      .onUpdate('cascade')
      .onDelete('cascade'),
  ],
);

export const seriesExtensions = pgTable(
  'series_extensions',
  {
    id: serial().primaryKey().notNull(),
    episodesTotal: integer('episodes_total').default(1).notNull(),
    seasonsTotal: integer('seasons_total').default(1).notNull(),
    filmId: integer('film_id').notNull(),
    finishedAt: date('finished_at'),
    createdAt: timestamp('created_at', { precision: 3, mode: 'string' })
      .defaultNow()
      .$onUpdate(() => new Date().toISOString())
      .notNull(),
    updatedAt: timestamp('updated_at', { precision: 3, mode: 'string' })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date().toISOString()),
  },
  (table) => [
    uniqueIndex('series_extensions_film_id_key').using(
      'btree',
      table.filmId.asc().nullsLast().op('int4_ops'),
    ),
    foreignKey({
      columns: [table.filmId],
      foreignColumns: [films.id],
      name: 'series_extensions_film_id_fkey',
    })
      .onUpdate('cascade')
      .onDelete('cascade'),
  ],
);

export const studios = pgTable(
  'studios',
  {
    id: serial().primaryKey().notNull(),
    title: text().notNull(),
    createdAt: timestamp('created_at', { precision: 3, mode: 'string' })
      .defaultNow()
      .$onUpdate(() => new Date().toISOString())
      .notNull(),
    updatedAt: timestamp('updated_at', { precision: 3, mode: 'string' })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date().toISOString()),
  },
  (table) => [
    uniqueIndex('studios_title_key').using('btree', table.title.asc().nullsLast().op('text_ops')),
  ],
);

export const users = pgTable(
  'users',
  {
    id: serial().primaryKey().notNull(),
    username: text().notNull(),
    password: text().notNull(),
    refreshToken: text('refresh_token'),
    createdAt: timestamp('created_at', { precision: 3, mode: 'string' })
      .defaultNow()
      .$onUpdate(() => new Date().toISOString())
      .notNull(),
    updatedAt: timestamp('updated_at', { precision: 3, mode: 'string' })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date().toISOString()),
  },
  (table) => [
    uniqueIndex('users_username_key').using(
      'btree',
      table.username.asc().nullsLast().op('text_ops'),
    ),
  ],
);

export const filmsPeople = pgTable(
  'films_people',
  {
    id: serial().primaryKey().notNull(),
    personId: integer('person_id').notNull(),
    filmId: integer('film_id').notNull(),
    role: personRole().notNull(),
    details: text(),
    comment: text(),
    createdAt: timestamp('created_at', { precision: 3, mode: 'string' })
      .defaultNow()
      .$onUpdate(() => new Date().toISOString())
      .notNull(),
    updatedAt: timestamp('updated_at', { precision: 3, mode: 'string' })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date().toISOString()),
  },
  (table) => [
    foreignKey({
      columns: [table.personId],
      foreignColumns: [people.id],
      name: 'films_people_person_id_fkey',
    })
      .onUpdate('cascade')
      .onDelete('cascade'),
    foreignKey({
      columns: [table.filmId],
      foreignColumns: [films.id],
      name: 'films_people_film_id_fkey',
    })
      .onUpdate('cascade')
      .onDelete('cascade'),
  ],
);

export const people = pgTable('people', {
  id: serial().primaryKey().notNull(),
  name: text().notNull(),
  createdAt: timestamp('created_at', { precision: 3, mode: 'string' })
    .defaultNow()
    .$onUpdate(() => new Date().toISOString())
    .notNull(),
  updatedAt: timestamp('updated_at', { precision: 3, mode: 'string' })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date().toISOString()),
  selected: boolean().default(false).notNull(),
});

export const pageContent = pgTable('page_content', {
  id: serial().primaryKey().notNull(),
  title: text().notNull(),
  content: text().notNull(),
  createdAt: timestamp('created_at', { precision: 3, mode: 'string' })
    .defaultNow()
    .$onUpdate(() => new Date().toISOString())
    .notNull(),
  updatedAt: timestamp('updated_at', { precision: 3, mode: 'string' })
    .defaultNow()
    .$onUpdate(() => new Date().toISOString())
    .notNull(),
  pageKey: text('page_key').notNull(),
});

export type Film = typeof films.$inferSelect;
export type Genre = typeof genres.$inferSelect;
export type Person = typeof people.$inferSelect;
export type FilmPerson = typeof filmsPeople.$inferSelect;
export type PersonRole = (typeof personRole.enumValues)[number];
export type FilmAwardNomination = typeof filmAwardNominations.$inferSelect;
export type Award = typeof awards.$inferSelect;
export type Nomination = typeof nominations.$inferSelect;
export type Studio = typeof studios.$inferSelect;
export type Country = typeof countries.$inferSelect;
export type Collection = typeof collections.$inferSelect;
export type SeriesExtension = typeof seriesExtensions.$inferSelect;
export type FilmTrailer = typeof filmTrailers.$inferSelect;
export type FilmCollection = typeof filmsCollections.$inferSelect;
export type FilmGenre = typeof filmsGenres.$inferInsert;
export type FilmStudio = typeof filmsStudios.$inferInsert;
export type FilmCountry = typeof filmsCountries.$inferInsert;
