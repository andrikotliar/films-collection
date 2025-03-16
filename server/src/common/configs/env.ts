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
] as const;

const getEnvVariables = (): EnvVariables => {
  const env = process.env;

  for (const variable of REQUIRED_VARIABLES) {
    if (!env[variable]) {
      throw new Error(`Missing environment variable: ${variable}`);
    }
  }

  return {
    PORT: Number(env.PORT),
    HOST: env.HOST,
    DATABASE_URL: env.DATABASE_URL!,
    NODE_ENV: env.NODE_ENV,
    FRONTEND_ORIGIN: env.FRONTEND_ORIGIN,
    AUTH_SECRET: env.AUTH_SECRET!,
    COOKIE_SECRET: env.COOKIE_SECRET!,
  };
};

export const env = getEnvVariables();
