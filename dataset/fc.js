import { MongoClient } from 'mongodb';
import { parseCliParams } from './helpers/parse-cli-params.js';
import { logger } from './helpers/logger.js';
import { getEnvironmentVariables } from './helpers/get-environment-variables.js';
import { insertCollections } from './services/insert.js';
import { deleteCollections } from './services/delete.js';
import { collectionsConfig } from './configs/collections.js';

const commandHandlers = {
  insert: insertCollections,
  delete: deleteCollections,
};

const init = async () => {
  const cliParams = parseCliParams();
  const env = getEnvironmentVariables(cliParams);

  const mongoClient = new MongoClient(env.database.uri);
  const database = mongoClient.db(env.database.name);

  try {
    const commandHandler = commandHandlers[cliParams.command];

    await commandHandler({ cliParams, collectionsConfig, database });

    await mongoClient.close();
  } catch (error) {
    logger.error(error?.message);
    await mongoClient.close();
  }
};

init();
