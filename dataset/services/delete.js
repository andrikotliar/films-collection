import { logger } from '../helpers/logger.js';
import { selectCollections } from '../helpers/select-collections.js';

export const deleteCollections = async ({
  database,
  cliParams,
  collectionsConfig,
}) => {
  const selectedCollections = selectCollections(
    collectionsConfig,
    cliParams.collections,
  );

  if (!selectedCollections.length) {
    return;
  }

  for (const config of selectedCollections) {
    await database.dropCollection(config.dbCollection);
    logger.success(`Collection [${config.dbCollection}] was deleted`);
  }
};
