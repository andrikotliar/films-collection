import path from 'node:path';
import { styleText } from 'node:util';
import fs from 'node:fs/promises';
import type { CompleteDataResponse, CompleteDataListItem } from '@films-collection/shared';
import { database } from '~/plugins';
import {
  awards,
  countries,
  filmAwardNominations,
  filmChapterKeys,
  films,
  filmsCountries,
  filmsGenres,
  filmsPeople,
  filmsStudios,
  filmTrailers,
  genres,
  nominations,
  people,
  seriesExtensions,
  studios,
} from '~/database/schema';

const DATA_FOLDER = path.join(import.meta.dirname, '../../data');

type ContentResponse<T extends Record<string, unknown>> = {
  filePath: string;
  data: T;
};

type BaseDataKeys = keyof CompleteDataResponse['baseData'];

const loggerWrapper = (
  type: 'log' | 'error',
  message: string,
  color: Parameters<typeof styleText>[0],
) => {
  // eslint-disable-next-line
  console[type](styleText(color, message));
};

const logger = {
  info: (message: string) => loggerWrapper('log', message, 'cyan'),
  error: (message: string) => loggerWrapper('error', message, 'redBright'),
  success: (message: string) => loggerWrapper('log', message, 'greenBright'),
};

const readContent = async <T extends Record<string, unknown>>(
  path: string,
): Promise<ContentResponse<T> | null> => {
  try {
    const content = await fs.readFile(path, 'utf-8');

    const data = JSON.parse(content) as T;
    return {
      filePath: path,
      data,
    };
  } catch (error: any) {
    logger.error(`[Reading file failed]: (${path}): ${error.message}`);
    return null;
  }
};

const getBaseData = async (): Promise<CompleteDataResponse['baseData']> => {
  const entries = await fs.readdir(DATA_FOLDER);

  const jsonFiles = entries.filter((entry) => entry.endsWith('.json'));

  const promises = jsonFiles.map(async (file) => readContent(path.join(DATA_FOLDER, file)));
  const data = await Promise.all(promises);
  const filteredData = data.filter((item) => item !== null);

  const result: CompleteDataResponse['baseData'] = {
    genres: [],
    countries: [],
    studios: [],
    awards: [],
    people: [],
  };

  for (const item of filteredData) {
    const key = path.basename(item.filePath).replace('.json', '') as BaseDataKeys;

    result[key] = item.data as any;
  }

  return result;
};

const getFilms = async () => {
  const filmsFolder = path.join(DATA_FOLDER, 'films');
  const entries = await fs.readdir(filmsFolder);

  const promises = entries.map(async (file) => {
    const result = await readContent<CompleteDataListItem>(path.join(filmsFolder, file));

    return result ? result.data : null;
  });

  const data = await Promise.all(promises);
  const filteredData = data.filter((item) => item !== null);

  return filteredData;
};

const getBaseDataConfig = (baseData: CompleteDataResponse['baseData']) => {
  return [
    {
      data: baseData.genres,
      table: genres,
    },
    {
      data: baseData.countries,
      table: countries,
    },
    {
      data: baseData.studios,
      table: studios,
    },
    {
      data: baseData.people,
      table: people,
    },
  ];
};

const run = async () => {
  const filmsList = await getFilms();
  const baseData = await getBaseData();
  const config = getBaseDataConfig(baseData);

  await database.transaction(async (tr) => {
    logger.info('Seeding base data');
    for (const configItem of config) {
      await tr.insert(configItem.table).values(configItem.data);
    }

    for (const award of baseData.awards) {
      const { nominations: nominationValues, ...awardInput } = award;

      await tr.insert(awards).values(awardInput);

      await tr.insert(nominations).values(
        nominationValues.map((nomination) => ({
          ...nomination,
          awardId: awardInput.id,
        })),
      );
    }

    logger.info('Base data seeded');
    logger.info('Seeding films');

    for (const film of filmsList) {
      const {
        countries,
        studios,
        genres,
        seriesExtension,
        trailers,
        castAndCrew,
        awards,
        ...filmDetails
      } = film;

      if (filmDetails.chapterKey) {
        await tr
          .insert(filmChapterKeys)
          .values({ key: filmDetails.chapterKey })
          .onConflictDoNothing();
      }

      const [createdFilm] = await tr
        .insert(films)
        .values({
          ...filmDetails,
          rating: 3,
          budget: filmDetails.budget ?? 0,
          boxOffice: filmDetails.boxOffice ?? 0,
        })
        .returning({ id: films.id });

      const filmId = createdFilm.id;

      if (countries.length) {
        const input = countries.map((item) => ({
          countryId: item.id,
          filmId,
        }));

        await tr.insert(filmsCountries).values(input);
      }

      if (genres.length) {
        const input = genres.map((item) => ({
          genreId: item.id,
          filmId,
        }));

        await tr.insert(filmsGenres).values(input);
      }

      if (studios.length) {
        const input = studios.map((item) => ({
          studioId: item.id,
          filmId,
        }));

        await tr.insert(filmsStudios).values(input);
      }

      if (trailers.length) {
        await tr.insert(filmTrailers).values(
          trailers.map((trailer) => ({
            ...trailer,
            filmId,
          })),
        );
      }

      if (seriesExtension) {
        await tr.insert(seriesExtensions).values({
          ...seriesExtension,
          filmId,
        });
      }

      if (awards.length) {
        for (const award of awards) {
          await tr.insert(filmAwardNominations).values(
            award.nominations.map((nomination) => ({
              awardId: award.id,
              nominationId: nomination.id,
              filmId,
            })),
          );
        }
      }

      if (castAndCrew) {
        for (const person of castAndCrew) {
          await tr.insert(filmsPeople).values({
            filmId,
            role: person.role,
            details: person.details,
            personId: person.id,
          });
        }
      }
    }
  });

  logger.success('Seeding completed');
  process.exit(0);
};

run().catch((error) => {
  logger.error(`[Seeding Error]: ${error.message}`);
  process.exit(1);
});
