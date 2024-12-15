import { insertDataIntoCollection } from '../helpers/insert-data.js';
import { selectCollections } from '../helpers/select-collections.js';

export const insertCollections = async ({
  cliParams,
  collectionsConfig,
  database,
}) => {
  const collections = selectCollections(
    collectionsConfig,
    cliParams.collections,
  );

  if (!collections.length) {
    return;
  }

  for (const config of collections) {
    const mongoDbCollection = database.collection(config.dbCollection);

    await insertDataIntoCollection(mongoDbCollection, config.loader);
  }
};
