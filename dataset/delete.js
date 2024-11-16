import { initApp } from './helpers/init-app.js';
import { logger } from './helpers/logger.js';

const { mongoClient, database, cliParams } = initApp();

const selectCollections = async () => {
  if (!cliParams.collections) {
    throw new Error('[--collections] parameter is not specified');
  }

  const dbCollections = await database.collections();

  if (!dbCollections.length) {
    throw new Error(
      `Database ${database.databaseName} doesn't have collections`,
    );
  }

  const collectionNames = dbCollections.map(
    (collection) => collection.collectionName,
  );

  if (cliParams.collections === 'all') {
    return {
      toSkip: [],
      toDelete: collectionNames,
    };
  }

  const requestedCollections = cliParams.collections.split(',');

  return requestedCollections.reduce(
    (result, currentCollection) => {
      if (collectionNames.includes(currentCollection)) {
        result.toDelete.push(currentCollection);

        return result;
      }

      result.toSkip.push(currentCollection);

      return result;
    },
    {
      toSkip: [],
      toDelete: [],
    },
  );
};

const init = async () => {
  try {
    const selectedCollections = await selectCollections();

    if (selectedCollections.toSkip.length) {
      logger.warning(
        `Collections [${selectedCollections.toSkip.join(
          ', ',
        )}] don't exist in the database [${
          database.databaseName
        }] and will be skipped.`,
      );
    }

    for (const collectionName of selectedCollections.toDelete) {
      await database.dropCollection(collectionName);
      logger.success(`Collection [${collectionName}] was deleted`);
    }

    await mongoClient.close();
  } catch (error) {
    logger.error(error?.stack);

    await mongoClient.close();
  }
};

init();
