import { MongoClient } from 'mongodb';
import { parseCliParams } from './helpers/parse-cli-params.js';
import { logger } from './helpers/logger.js';
import { getEnvironmentVariables } from './helpers/get-environment-variables.js';
import { insertCollections } from './services/insert.js';
import { deleteCollections } from './services/delete.js';
import { exportDataFromDatabase } from './services/export.js';
import { collectionsConfig } from './configs/collections.js';
import { cliConfig } from './configs/cli-config.js';
import { getCommand } from './helpers/get-command.js';

const commandHandlers = {
  insert: insertCollections,
  delete: deleteCollections,
  export: exportDataFromDatabase,
};

const init = async () => {
  const terminalArgs = process.argv;

  try {
    const command = getCommand(terminalArgs, cliConfig.commands);
    const cliParams = parseCliParams(terminalArgs, cliConfig.paramsMap);
    const env = getEnvironmentVariables(cliParams.envFile);

    const mongoClient = new MongoClient(env.database.uri);
    const database = mongoClient.db(env.database.name);

    const commandHandler = commandHandlers[command];

    await commandHandler({ cliParams, collectionsConfig, database });

    await mongoClient.close();
  } catch (error) {
    logger.error(error?.message);
    process.exit(0);
  }
};

init();
