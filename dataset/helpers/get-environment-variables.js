import { config } from 'dotenv';
import { logger } from './logger.js';

const requiredVariables = ['MONGODB_URI', 'DATABASE_NAME'];

const validateVariables = (env) => {
  const missingVars = [];

  try {
    for (const variable of requiredVariables) {
      if (!env[variable]) {
        missingVars.push(variable);
      }
    }

    if (missingVars.length) {
      const errorMessage = `The environment file has missing variables: ${missingVars.join(
        ', ',
      )}`;

      throw new Error(errorMessage);
    }

    return env;
  } catch (error) {
    logger.error(error?.message);
    process.exit(0);
  }
};

const getEnvironmentVariables = (cliParams) => {
  const { parsed: envVariables, error } = config({
    path: cliParams.envFile,
  });

  if (!envVariables) {
    logger.error('Error parsing environment file', error);
    process.exit(0);
  }

  const { MONGODB_URI, DATABASE_NAME } = validateVariables(envVariables);

  return {
    database: {
      uri: MONGODB_URI,
      name: DATABASE_NAME,
    },
  };
};

export { getEnvironmentVariables };
