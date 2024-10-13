import { MongoClient } from 'mongodb';
import { getEnvironmentVariables } from './helpers/get-environment-variables.js';
import { logger } from './helpers/logger.js';
import { insertDataIntoCollection } from './helpers/insert-data.js';
import { collectionsConfig } from './config.js';

const env = getEnvironmentVariables();

const mongoClient = new MongoClient(env.database.uri);

const init = async () => {
  try {
    const collectionName = process.argv[2];

    const collectionToInsert = collectionsConfig.find(
      (config) => config.dbCollection === collectionName,
    );

    if (!collectionToInsert) {
      throw new Error(
        `Collection ${collectionName} is not defined in the config`,
      );
    }

    const database = mongoClient.db(env.database.name);

    const mongoDbCollection = database.collection(
      collectionToInsert.dbCollection,
    );

    await insertDataIntoCollection(
      mongoDbCollection,
      collectionToInsert.loader,
    );

    await mongoClient.close();
  } catch (error) {
    logger.error(error?.stack);

    await mongoClient.close();
  }
};

init();
