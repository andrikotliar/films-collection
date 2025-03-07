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
  SeriesSeason,
} from '@prisma/client';
import { readdir, readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

type FilmBaseData = Omit<Film, 'createdAt' | 'updatedAt' | 'draft'> & {
  $schema: string;
};
type FilmRelations = {
  awards: Omit<FilmAwardNomination, 'id' | 'filmId'>[];
  cast: Omit<FilmCast, 'id' | 'filmId'>[];
  collections: Omit<FilmCollection, 'id' | 'filmId'>[];
  countries: Omit<FilmCountry, 'id' | 'filmId'>[];
  crew: Omit<FilmCrew, 'id' | 'filmId'>[];
  genres: Omit<FilmGenre, 'id' | 'filmId'>[];
  studios: Omit<FilmStudio, 'id' | 'filmId'>[];
  seriesExtension?: Omit<SeriesExtension, 'id' | 'filmId'> & {
    seasons: Omit<SeriesSeason, 'id' | 'seriesExtensionId'>[];
  };
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

  if (seriesExtension) {
    const { seasons, ...extension } = seriesExtension;

    filmRelations.seriesExtension = {
      create: {
        ...extension,
        seasons: {
          create: seasons,
        },
      },
    };
  }

  return {
    ...baseFilmData,
    ...filmRelations,
  };
};

const main = async () => {
  const general = await loadJsonData(generalJsonFolderPath);
  const films = await loadJsonData<FilmSeedData>(filmsJsonFolderPath);
  const sortedFilms = films.sort((a, b) => a.data.id - b.data.id);

  for (const table of general) {
    const handler = fileToPrismaHandler[table.filePath as FilePath];

    await handler(table.data);
  }

  const mappedFilmsData = sortedFilms.map(mapFilmDataToPrismaStructure);

  for (const film of mappedFilmsData) {
    await prisma.film.create({
      data: film,
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
