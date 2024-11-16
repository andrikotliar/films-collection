import { logger } from './helpers/logger.js';
import { insertDataIntoCollection } from './helpers/insert-data.js';
import { collectionsConfig } from './configs/collections.js';
import { initApp } from './helpers/init-app.js';

const { mongoClient, database, cliParams } = initApp();

const init = async () => {
  try {
    if (!cliParams.collection) {
      throw new Error(`--collection param is not specified`);
    }

    const collectionToInsert = collectionsConfig.find(
      (config) => config.dbCollection === cliParams.collection,
    );

    if (!collectionToInsert) {
      throw new Error(
        `Collection ${cliParams.collection} is not defined in the config`,
      );
    }

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
