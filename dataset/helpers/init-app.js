import { MongoClient } from 'mongodb';
import { parseCliParams } from './parse-cli-params.js';
import { getEnvironmentVariables } from './get-environment-variables.js';

const initApp = () => {
  const cliParams = parseCliParams();
  const env = getEnvironmentVariables(cliParams);

  const mongoClient = new MongoClient(env.database.uri);
  const database = mongoClient.db(env.database.name);

  return {
    cliParams,
    env,
    mongoClient,
    database,
  };
};

export { initApp };
