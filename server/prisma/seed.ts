import 'dotenv/config';
import {
  PrismaClient,
  Film,
  Prisma,
  FilmAwardNomination,
  FilmCollection,
  FilmCountry,
  FilmGenre,
  FilmStudio,
  SeriesExtension,
  FilmTrailer,
  FilmPerson,
} from '@prisma/client';
import { ITXClientDenyList } from '@prisma/client/runtime/library';
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { hash } from 'bcrypt';

type FilmBaseData = Omit<Film, 'createdAt' | 'updatedAt' | 'draft'> & {
  $schema: string;
};

type FilmRelationOmitFields = 'id' | 'filmId';

type FilmRelations = {
  awards: Omit<FilmAwardNomination, FilmRelationOmitFields>[];
  collections: Omit<FilmCollection, FilmRelationOmitFields>[];
  countries: Omit<FilmCountry, FilmRelationOmitFields>[];
  castAndCrew: Omit<FilmPerson, FilmRelationOmitFields>[];
  genres: Omit<FilmGenre, FilmRelationOmitFields>[];
  studios: Omit<FilmStudio, FilmRelationOmitFields>[];
  trailers: Omit<FilmTrailer, FilmRelationOmitFields>[];
  seriesExtension?: Omit<SeriesExtension, FilmRelationOmitFields>;
};
type BaseGeneralData = {
  id: number;
  createdAt: string;
  updatedAt: string;
  [key: string]: unknown;
};
type FilmSeedData = FilmBaseData & FilmRelations;
type LoadJsonDataResult<T> = {
  filePath: string;
  data: T;
};
type FileToPrismaHandlerConfig = {
  [fileName: string]: (data: any) => Promise<void>;
};

const prisma = new PrismaClient();

const datasetFolderPath = join(import.meta.dirname, '../../dataset');
const filmsJsonFolderPath = join(datasetFolderPath, 'films');
const generalJsonFolderPath = join(datasetFolderPath, 'general');

const alterSequence = async (tableName: string) => {
  const sequence = `${tableName}_id_seq`;

  await prisma.$executeRawUnsafe(`
    SELECT setval('${sequence}', (SELECT MAX(id) FROM ${tableName}));
  `);
};

const getAdminUser = async (): Promise<Prisma.UserCreateInput | null> => {
  const { APP_ADMIN_USERNAME, APP_ADMIN_PASSWORD } = process.env;

  if (!APP_ADMIN_USERNAME || !APP_ADMIN_PASSWORD) {
    return null;
  }

  const password = await hash(APP_ADMIN_PASSWORD, 10);

  return {
    username: APP_ADMIN_USERNAME,
    password,
    verified: true,
  };
};

const getFileToPrismaHandlerConfig = (
  prisma: Omit<PrismaClient, ITXClientDenyList>,
): FileToPrismaHandlerConfig => ({
  'awards.json': async (data) => {
    await prisma.award.createMany({ data });
    await alterSequence('awards');
  },
  'collections.json': async (data) => {
    await prisma.collection.createMany({ data });
    await alterSequence('collections');
  },
  'countries.json': async (data) => {
    await prisma.country.createMany({ data });
    await alterSequence('countries');
  },
  'genres.json': async (data) => {
    await prisma.genre.createMany({ data });
    await alterSequence('genres');
  },
  'nominations.json': async (data) => {
    await prisma.nomination.createMany({ data });
    await alterSequence('nominations');
  },
  'people.json': async (data) => {
    await prisma.person.createMany({ data });
    await alterSequence('people');
  },
  'studios.json': async (data) => {
    await prisma.studio.createMany({ data });
    await alterSequence('studios');
  },
  'chapter-keys.json': async (data) => {
    await prisma.filmChapterKey.createMany({ data });
  },
});

const loadJsonData = async <T = unknown>(
  folderPath: string,
): Promise<LoadJsonDataResult<T>[]> => {
  const files = await readdir(folderPath);
  const filteredFiles = files.filter((fileName) => !fileName.startsWith('_'));

  const data = filteredFiles.map(async (filePath) => {
    const stringifiedData = await readFile(join(folderPath, filePath), {
      encoding: 'utf8',
    });

    const parsedData = JSON.parse(stringifiedData);

    return {
      data: parsedData,
      filePath,
    };
  });

  const result = await Promise.all(data);

  return result;
};

const mapFilmDataToPrismaStructure = (
  film: LoadJsonDataResult<FilmSeedData>,
): Prisma.FilmCreateArgs['data'] => {
  const {
    $schema: _schema,
    awards,
    genres,
    collections,
    countries,
    studios,
    castAndCrew,
    trailers,
    seriesExtension,
    ...baseFilmData
  } = film.data;

  const filmRelations: Partial<Prisma.FilmUncheckedCreateInput> = {};

  if (collections.length) {
    filmRelations.collections = {
      create: collections,
    };
  }

  if (awards.length) {
    filmRelations.awards = {
      create: awards,
    };
  }

  if (genres.length) {
    filmRelations.genres = {
      create: genres,
    };
  }

  if (countries.length) {
    filmRelations.countries = {
      create: countries,
    };
  }

  if (studios.length) {
    filmRelations.studios = {
      create: studios,
    };
  }

  if (castAndCrew.length) {
    filmRelations.castAndCrew = {
      create: castAndCrew,
    };
  }

  if (trailers.length) {
    filmRelations.trailers = {
      create: trailers,
    };
  }

  if (seriesExtension) {
    filmRelations.seriesExtension = {
      create: seriesExtension,
    };
  }

  return {
    ...baseFilmData,
    ...filmRelations,
  };
};

const main = async () => {
  let filmCurrentDateMs = new Date(
    new Date().setUTCHours(0, 0, 0, 0),
  ).getTime();
  let generalDataCurrentDateMs = new Date(
    new Date().setUTCHours(0, 0, 0, 0),
  ).getTime();

  const general = await loadJsonData<BaseGeneralData>(generalJsonFolderPath);
  const films = await loadJsonData<FilmSeedData>(filmsJsonFolderPath);
  const sortedFilms = films.sort((a, b) => a.data.id - b.data.id);

  await prisma.$transaction(async (trx) => {
    const config = getFileToPrismaHandlerConfig(trx);

    for (const table of general) {
      const handler = config[table.filePath];

      if (typeof handler !== 'function') {
        throw new Error(`Handler for ${table.filePath} not found`);
      }

      const date = new Date(generalDataCurrentDateMs).toISOString();
      table.data.createdAt = date;
      table.data.updatedAt = date;

      await handler(table.data);

      generalDataCurrentDateMs += 1000;
    }
  });

  const mappedFilmsData = sortedFilms.map(mapFilmDataToPrismaStructure);

  for (const film of mappedFilmsData) {
    const date = new Date(filmCurrentDateMs).toISOString();

    film.createdAt = date;
    film.updatedAt = date;

    await prisma.film.create({
      data: film,
    });

    filmCurrentDateMs += 1000;
  }

  await alterSequence('films');

  const adminUser = await getAdminUser();

  if (adminUser) {
    await prisma.user.create({
      data: adminUser,
    });
  }
};

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);

    await prisma.$disconnect();

    process.exit();
  });
