import { PrismaClient, Film, Prisma } from '@prisma/client';

import { readdir, readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

type FilmSeedData = Omit<Film, 'createdAt' | 'updatedAt' | 'draft'>;
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
const relationsJsonFolderPath = join(datasetFolderPath, 'relations');

const fileToPrismaHandler: FileToPrismaHandler = {
  'awards.json': (data) => prisma.award.createMany({ data }),
  'collections.json': (data) => prisma.collection.createMany({ data }),
  'countries.json': (data) => prisma.country.createMany({ data }),
  'genres.json': (data) => prisma.genre.createMany({ data }),
  'nominations.json': (data) => prisma.nomination.createMany({ data }),
  'people.json': (data) => prisma.person.createMany({ data }),
  'studios.json': (data) => prisma.studio.createMany({ data }),
  'films-awards-nominations.json': (data) =>
    prisma.filmAwardNomination.createMany({ data }),
  'films-cast.json': (data) => prisma.filmCast.createMany({ data }),
  'films-collections.json': (data) =>
    prisma.filmCollection.createMany({ data }),
  'films-countries.json': (data) => prisma.filmCountry.createMany({ data }),
  'films-crew.json': (data) => prisma.filmCrew.createMany({ data }),
  'films-genres.json': (data) => prisma.filmGenre.createMany({ data }),
  'films-studios.json': (data) => prisma.filmStudio.createMany({ data }),
  'series-extensions.json': (data) =>
    prisma.seriesExtension.createMany({ data }),
  'series-seasons.json': (data) => prisma.seriesSeason.createMany({ data }),
};

const loadJsonData = async <T = unknown>(
  folderPath: string,
): Promise<LoadJsonDataResult<T>[]> => {
  const files = await readdir(folderPath);

  const data = files.map(async (filePath) => {
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

const main = async () => {
  const films = await loadJsonData<FilmSeedData>(filmsJsonFolderPath);
  const bareFilms = films.map((film) => film.data).sort((a, b) => a.id - b.id);

  const general = await loadJsonData(generalJsonFolderPath);
  const relations = await loadJsonData(relationsJsonFolderPath);

  const tables = [...general, ...relations];

  await prisma.film.createMany({ data: bareFilms });

  for (const table of tables) {
    const handler = fileToPrismaHandler[table.filePath as FilePath];

    await handler(table.data);
  }
};

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);

    await prisma.$disconnect();

    process.exit();
  });
