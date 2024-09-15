import { config } from 'dotenv';
import chalk from 'chalk';

config();

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
  } catch (error) {
    console.log(chalk.red('[ERROR]:', error?.message));
    process.exit();
  }
};

const getEnvironmentVariables = () => {
  validateVariables(process.env);

  const { MONGODB_URI, DATABASE_NAME } = process.env;

  return {
    database: {
      uri: MONGODB_URI,
      name: DATABASE_NAME,
    },
  };
};

export { getEnvironmentVariables };
