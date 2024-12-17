import { config } from 'dotenv';
import { EnvVariables } from 'src/common';

config();

const REQUIRED_VARIABLES = [
  'PORT',
  'HOST',
  'MONGODB_URI',
  'AUTH_SECRET',
  'COOKIE_SECRET',
];

const getEnvVariables = (): EnvVariables => {
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
    AUTH_SECRET: process.env.AUTH_SECRET!,
    COOKIE_SECRET: process.env.COOKIE_SECRET!,
  };
};

export const env = getEnvVariables();
