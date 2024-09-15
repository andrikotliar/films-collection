import { MongoClient } from 'mongodb';
import { getEnvironmentVariables } from './helpers/get-environment-variables.js';
import { getFileData } from './helpers/get-file-data.js';
import { getFilesList } from './helpers/get-files-list.js';
import { logger } from './helpers/logger.js';

const env = getEnvironmentVariables();

const mongoClient = new MongoClient(env.database.uri);

const getData = async (path, dataType) => {
  logger.startProcess(`Start loading ${dataType} data ...`);

  const data = await getFileData(path);

  logger.finishProcess(`${dataType} data loaded:`, data.length);

  return data;
};

const loadFilms = async () => {
  const folderPath = './data/films';
  const files = await getFilesList(folderPath);
  const now = new Date();

  logger.startProcess('Start loading films data ...');

  const promises = files.map(async (fileName) => {
    const film = await getFileData(`${folderPath}/${fileName}`);

    if (!film) {
      throw new Error(`Failed process ${fileName}`);
    }

    return {
      ...film,
      createdAt: now,
    };
  });

  const dataset = await Promise.all(promises);

  logger.finishProcess('Films data loaded:', dataset.length);

  return dataset;
};

const loadLocalData = async () => {
  const films = await loadFilms();
  const actors = await getData('./data/supporting/actors.json', 'Actors');
  const related = await getData(
    './data/supporting/related-films.json',
    'Related films',
  );

  return {
    films,
    actors,
    related,
  };
};

const insertDataIntoCollection = async (collection, data, title) => {
  const result = await collection.insertMany(data);

  if (result.acknowledged) {
    logger.success(
      `${title} data successfully inserted:`,
      result.insertedCount,
    );
  }
};

const init = async () => {
  try {
    const database = mongoClient.db(env.database.name);

    const actorsCollection = database.collection('actors');
    const relatedCollection = database.collection('related');
    const filmsCollection = database.collection('films');

    const { films, actors, related } = await loadLocalData();

    await insertDataIntoCollection(filmsCollection, films, 'Films');
    await insertDataIntoCollection(actorsCollection, actors, 'Actors');
    await insertDataIntoCollection(relatedCollection, related, 'Related films');

    await mongoClient.close();
  } catch (error) {
    logger.error(error?.stack);

    await mongoClient.close();
  }
};

init();
