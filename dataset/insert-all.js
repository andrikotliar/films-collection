import { MongoClient } from 'mongodb';
import { getEnvironmentVariables } from './helpers/get-environment-variables.js';
import { logger } from './helpers/logger.js';
import { insertDataIntoCollection } from './helpers/insert-data.js';
import { collectionsConfig } from './config.js';

const env = getEnvironmentVariables();

const mongoClient = new MongoClient(env.database.uri);

const init = async () => {
  try {
    const database = mongoClient.db(env.database.name);

    const promises = collectionsConfig.map(async (dataConfig) => {
      const mongoDbCollection = database.collection(dataConfig.dbCollection);

      const result = await insertDataIntoCollection(
        mongoDbCollection,
        dataConfig.loader,
      );

      return result;
    });

    await Promise.all(promises);

    await mongoClient.close();
  } catch (error) {
    logger.error(error?.stack);

    await mongoClient.close();
  }
};

init();
