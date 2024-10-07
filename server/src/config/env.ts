import { config } from 'dotenv';

config();

const REQUIRED_VARIABLES = ['PORT', 'HOST', 'MONGODB_URI'];

const getEnvVariables = () => {
  const env = process.env;

  for (const variable of REQUIRED_VARIABLES) {
    if (!env[variable]) {
      throw new Error(`Missing environment variable: ${variable}`);
    }
  }

  return {
    PORT: Number(process.env.PORT),
    HOST: process.env.HOST,
    MONGODB_URI: process.env.MONGODB_URI!,
    NODE_ENV: process.env.NODE_ENV,
    FRONTEND_ORIGIN: process.env.FRONTEND_ORIGIN,
  };
};

const env = getEnvVariables();

export { env };
