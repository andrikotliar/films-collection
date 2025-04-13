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
type FilePath = keyof typeof fileToPrismaHandler;
type LoadJsonDataResult<T> = {
  filePath: string;
  data: T;
};
type FileToPrismaHandler = {
  [fileName: string]: (data: any) => Prisma.PrismaPromise<Prisma.BatchPayload>;
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const prisma = new PrismaClient();

const datasetFolderPath = join(__dirname, '../../dataset');
const filmsJsonFolderPath = join(datasetFolderPath, 'films');
const generalJsonFolderPath = join(datasetFolderPath, 'general');

const fileToPrismaHandler: FileToPrismaHandler = {
  'awards.json': (data) => prisma.award.createMany({ data }),
  'collections.json': (data) => prisma.collection.createMany({ data }),
  'countries.json': (data) => prisma.country.createMany({ data }),
  'genres.json': (data) => prisma.genre.createMany({ data }),
  'nominations.json': (data) => prisma.nomination.createMany({ data }),
  'people.json': (data) => prisma.person.createMany({ data }),
  'studios.json': (data) => prisma.studio.createMany({ data }),
};

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

  for (const table of general) {
    const handler = fileToPrismaHandler[table.filePath as FilePath];

    await handler(table.data);
  }

  const mappedFilmsData = sortedFilms.map(mapFilmDataToPrismaStructure);

  for (const film of mappedFilmsData) {
    film.createdAt = new Date(currentDateMs).toISOString();

    await prisma.film.create({
      data: film,
    });

    currentDateMs += 1000;
  }
};

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);

    await prisma.$disconnect();

    process.exit();
  });
