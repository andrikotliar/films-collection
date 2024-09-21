import { config } from 'dotenv';

config();

const REQUIRED_VARIABLES = ['PORT', 'MONGODB_URI'];

const getEnvVariables = () => {
  const env = process.env;

  for (const variable of REQUIRED_VARIABLES) {
    if (!env[variable]) {
      throw new Error(`Missing environment variable: ${variable}`);
    }
  }

  return {
    PORT: Number(process.env.PORT),
    MONGODB_URI: process.env.MONGODB_URI!,
    NODE_ENV: process.env.NODE_ENV,
  };
};

const env = getEnvVariables();

export { env };
