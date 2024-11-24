import { insertDataIntoCollection } from '../helpers/insert-data.js';
import { logger } from '../helpers/logger.js';

const selectCollections = (source, requestedCollections) => {
  if (!requestedCollections.length) {
    return {
      toSkip: [],
      toInsert: source,
    };
  }

  return requestedCollections.reduce(
    (result, currentCollection) => {
      const config = source.find(
        (config) => currentCollection === config.dbCollection,
      );

      if (!config) {
        result.toSkip.push(currentCollection);
        return result;
      }

      result.toInsert.push(config);

      return result;
    },
    {
      toSkip: [],
      toInsert: [],
    },
  );
};

const insertCollections = async ({
  cliParams,
  collectionsConfig,
  database,
}) => {
  const collectionsToInsert = selectCollections(
    collectionsConfig,
    cliParams.collections,
  );

  if (collectionsToInsert.toSkip.length) {
    const collectionsListString = collectionsToInsert.toSkip.join(', ');

    logger.warning(
      `Unknown collections [${collectionsListString}] are skipped.`,
    );
  }

  if (!collectionsToInsert.toInsert.length) {
    return;
  }

  for (const config of collectionsToInsert.toInsert) {
    const mongoDbCollection = database.collection(config.dbCollection);

    await insertDataIntoCollection(mongoDbCollection, config.loader);
  }
};

export { insertCollections };
