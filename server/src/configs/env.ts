import { config } from 'dotenv';

config();

type EnvVariables = {
  PORT: number;
  DATABASE_URL: string;
  AUTH_SECRET: string;
  COOKIE_SECRET: string;
  HOST?: string;
  NODE_ENV?: string;
  FRONTEND_ORIGIN?: string;
};

const REQUIRED_VARIABLES = [
  'PORT',
  'HOST',
  'DATABASE_URL',
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
    DATABASE_URL: process.env.DATABASE_URL!,
    NODE_ENV: process.env.NODE_ENV,
    FRONTEND_ORIGIN: process.env.FRONTEND_ORIGIN,
    AUTH_SECRET: process.env.AUTH_SECRET!,
    COOKIE_SECRET: process.env.COOKIE_SECRET!,
  };
};

export const env = getEnvVariables();
