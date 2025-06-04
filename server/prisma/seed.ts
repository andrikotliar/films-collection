import {
  PrismaClient,
  Film,
  Prisma,
  FilmAwardNomination,
  FilmCast,
  FilmCollection,
  FilmCountry,
  FilmCrew,
  FilmGenre,
  FilmStudio,
  SeriesExtension,
  FilmTrailer,
} from '@prisma/client';
import { ITXClientDenyList } from '@prisma/client/runtime/library';
import { readdir, readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

type FilmBaseData = Omit<Film, 'createdAt' | 'updatedAt' | 'draft'> & {
  $schema: string;
};

type FilmRelationOmitFields = 'id' | 'filmId';

type FilmRelations = {
  awards: Omit<FilmAwardNomination, FilmRelationOmitFields>[];
  cast: Omit<FilmCast, FilmRelationOmitFields>[];
  collections: Omit<FilmCollection, FilmRelationOmitFields>[];
  countries: Omit<FilmCountry, FilmRelationOmitFields>[];
  crew: Omit<FilmCrew, FilmRelationOmitFields>[];
  genres: Omit<FilmGenre, FilmRelationOmitFields>[];
  studios: Omit<FilmStudio, FilmRelationOmitFields>[];
  trailers: Omit<FilmTrailer, FilmRelationOmitFields>[];
  seriesExtension?: Omit<SeriesExtension, FilmRelationOmitFields>;
};
type FilmSeedData = FilmBaseData & FilmRelations;
type LoadJsonDataResult<T> = {
  filePath: string;
  data: T;
};
type FileToPrismaHandlerConfig = {
  [fileName: string]: (data: any) => Promise<void>;
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const prisma = new PrismaClient();

const datasetFolderPath = join(__dirname, '../../dataset');
const filmsJsonFolderPath = join(datasetFolderPath, 'films');
const generalJsonFolderPath = join(datasetFolderPath, 'general');

const alterSequence = async (tableName: string) => {
  const sequence = `${tableName}_id_seq`;

  await prisma.$executeRawUnsafe(`
    SELECT setval('${sequence}', (SELECT MAX(id) FROM ${tableName}));
  `);
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
    cast,
    crew,
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

  if (cast.length) {
    filmRelations.cast = {
      create: cast,
    };
  }

  if (crew.length) {
    filmRelations.crew = {
      create: crew,
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
  let currentDateMs = new Date(new Date().setUTCHours(0, 0, 0, 0)).getTime();

  const general = await loadJsonData(generalJsonFolderPath);
  const films = await loadJsonData<FilmSeedData>(filmsJsonFolderPath);
  const sortedFilms = films.sort((a, b) => a.data.id - b.data.id);

  await prisma.$transaction(async (trx) => {
    const config = getFileToPrismaHandlerConfig(trx);

    for (const table of general) {
      const handler = config[table.filePath];

      if (typeof handler !== 'function') {
        throw new Error(`Handler for ${table.filePath} not found`);
      }

      await handler(table.data);
    }
  });

  const mappedFilmsData = sortedFilms.map(mapFilmDataToPrismaStructure);

  for (const film of mappedFilmsData) {
    film.createdAt = new Date(currentDateMs).toISOString();

    await prisma.film.create({
      data: film,
    });

    currentDateMs += 1000;
  }

  await alterSequence('films');
};

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);

    await prisma.$disconnect();

    process.exit();
  });
