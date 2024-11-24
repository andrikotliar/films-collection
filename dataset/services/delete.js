import { logger } from '../helpers/logger.js';

const selectCollections = async (database, requestedCollections) => {
  const dbCollections = await database.collections();

  if (!dbCollections.length) {
    throw new Error(
      `Database ${database.databaseName} doesn't have collections`,
    );
  }

  const collectionNames = dbCollections.map(
    (collection) => collection.collectionName,
  );

  if (!requestedCollections.length) {
    return {
      toSkip: [],
      toDelete: collectionNames,
    };
  }

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

const deleteCollections = async ({ database, cliParams }) => {
  const selectedCollections = await selectCollections(
    database,
    cliParams.collections,
  );

  if (selectedCollections.toSkip.length) {
    const skipCollectionsString = selectedCollections.toSkip.join(', ');

    logger.warning(`Collections [${skipCollectionsString}] skipped.`);
  }

  if (!selectedCollections.toDelete.length) {
    return;
  }

  for (const collectionName of selectedCollections.toDelete) {
    await database.dropCollection(collectionName);
    logger.success(`Collection [${collectionName}] was deleted`);
  }
};

export { deleteCollections };
