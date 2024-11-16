import { logger } from './helpers/logger.js';
import { insertDataIntoCollection } from './helpers/insert-data.js';
import { collectionsConfig } from './configs/collections.js';
import { initApp } from './helpers/init-app.js';

const { mongoClient, database } = initApp();

const init = async () => {
  try {
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
