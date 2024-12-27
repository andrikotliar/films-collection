import { insertDataIntoCollection } from '../helpers/insert-data.js';
import { selectCollections } from '../helpers/select-collections.js';
import { loadJsonData } from '../helpers/load-json-data.js';
import { loadMultipleFilesData } from '../helpers/load-multiple-files-data.js';

const loadersMap = {
  single: loadJsonData,
  multiple: loadMultipleFilesData,
};

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

    const dataLoader = loadersMap[config.mode];

    await insertDataIntoCollection({
      collection: mongoDbCollection,
      getData: () => dataLoader(config.dataPath),
    });
  }
};
