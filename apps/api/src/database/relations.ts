import { relations } from 'drizzle-orm/relations';
import {
  filmChapterKeys,
  films,
  collectionEvents,
  collections,
  filmsCollections,
  pendingFilms,
  filmTrailers,
  awards,
  filmAwardNominations,
  nominations,
  people,
  filmsCountries,
  countries,
  filmsGenres,
  genres,
  filmsStudios,
  studios,
  seriesExtensions,
  filmsPeople,
} from './schema';

export const filmsRelations = relations(films, ({ one, many }) => ({
  chapterKey: one(filmChapterKeys, {
    fields: [films.chapterKey],
    references: [filmChapterKeys.key],
  }),
  collectionEvents: many(collectionEvents),
  collections: many(filmsCollections),
  trailers: many(filmTrailers),
  awards: many(filmAwardNominations),
  countries: many(filmsCountries),
  genres: many(filmsGenres),
  studios: many(filmsStudios),
  seriesExtensions: many(seriesExtensions),
  filmsPeople: many(filmsPeople),
}));

export const filmChapterKeysRelations = relations(filmChapterKeys, ({ many }) => ({
  films: many(films),
}));

export const collectionEventsRelations = relations(collectionEvents, ({ one }) => ({
  film: one(films, {
    fields: [collectionEvents.titleFilmId],
    references: [films.id],
  }),
  collection: one(collections, {
    fields: [collectionEvents.collectionId],
    references: [collections.id],
  }),
}));

export const collectionsRelations = relations(collections, ({ many }) => ({
  collectionEvents: many(collectionEvents),
  films: many(filmsCollections),
  pendingFilms: many(pendingFilms),
}));

export const filmsCollectionsRelations = relations(filmsCollections, ({ one }) => ({
  film: one(films, {
    fields: [filmsCollections.filmId],
    references: [films.id],
  }),
  collection: one(collections, {
    fields: [filmsCollections.collectionId],
    references: [collections.id],
  }),
}));

export const pendingFilmsRelations = relations(pendingFilms, ({ one }) => ({
  collection: one(collections, {
    fields: [pendingFilms.collectionId],
    references: [collections.id],
  }),
}));

export const filmTrailersRelations = relations(filmTrailers, ({ one }) => ({
  film: one(films, {
    fields: [filmTrailers.filmId],
    references: [films.id],
  }),
}));

export const filmAwardNominationsRelations = relations(filmAwardNominations, ({ one }) => ({
  award: one(awards, {
    fields: [filmAwardNominations.awardId],
    references: [awards.id],
  }),
  nomination: one(nominations, {
    fields: [filmAwardNominations.nominationId],
    references: [nominations.id],
  }),
  film: one(films, {
    fields: [filmAwardNominations.filmId],
    references: [films.id],
  }),
  person: one(people, {
    fields: [filmAwardNominations.actorId],
    references: [people.id],
  }),
}));

export const awardsRelations = relations(awards, ({ many }) => ({
  films: many(filmAwardNominations),
  nominations: many(nominations),
}));

export const nominationsRelations = relations(nominations, ({ one, many }) => ({
  films: many(filmAwardNominations),
  award: one(awards, {
    fields: [nominations.awardId],
    references: [awards.id],
  }),
}));

export const peopleRelations = relations(people, ({ many }) => ({
  awards: many(filmAwardNominations),
  films: many(filmsPeople),
}));

export const filmsCountriesRelations = relations(filmsCountries, ({ one }) => ({
  film: one(films, {
    fields: [filmsCountries.filmId],
    references: [films.id],
  }),
  country: one(countries, {
    fields: [filmsCountries.countryId],
    references: [countries.id],
  }),
}));

export const countriesRelations = relations(countries, ({ many }) => ({
  films: many(filmsCountries),
}));

export const filmsGenresRelations = relations(filmsGenres, ({ one }) => ({
  film: one(films, {
    fields: [filmsGenres.filmId],
    references: [films.id],
  }),
  genre: one(genres, {
    fields: [filmsGenres.genreId],
    references: [genres.id],
  }),
}));

export const genresRelations = relations(genres, ({ many }) => ({
  films: many(filmsGenres),
}));

export const filmsStudiosRelations = relations(filmsStudios, ({ one }) => ({
  film: one(films, {
    fields: [filmsStudios.filmId],
    references: [films.id],
  }),
  studio: one(studios, {
    fields: [filmsStudios.studioId],
    references: [studios.id],
  }),
}));

export const studiosRelations = relations(studios, ({ many }) => ({
  films: many(filmsStudios),
}));

export const seriesExtensionsRelations = relations(seriesExtensions, ({ one }) => ({
  film: one(films, {
    fields: [seriesExtensions.filmId],
    references: [films.id],
  }),
}));

export const filmsPeopleRelations = relations(filmsPeople, ({ one }) => ({
  person: one(people, {
    fields: [filmsPeople.personId],
    references: [people.id],
  }),
  film: one(films, {
    fields: [filmsPeople.filmId],
    references: [films.id],
  }),
}));
