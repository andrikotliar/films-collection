import { config } from 'dotenv';

config();

export type EnvVariables = {
  PORT: number;
  DATABASE_URL: string;
  AUTH_SECRET: string;
  COOKIE_SECRET: string;
  CLOUDINARY_CLOUD_NAME: string;
  CLOUDINARY_API_KEY: string;
  CLOUDINARY_API_SECRET: string;
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
  'CLOUDINARY_CLOUD_NAME',
  'CLOUDINARY_API_KEY',
  'CLOUDINARY_API_SECRET',
] as const;

const getEnvVariables = (): EnvVariables => {
  const env = process.env as unknown as EnvVariables;

  for (const variable of REQUIRED_VARIABLES) {
    if (!env[variable]) {
      throw new Error(`Missing environment variable: ${variable}`);
    }
  }

  return {
    PORT: Number(env.PORT),
    HOST: env.HOST,
    DATABASE_URL: env.DATABASE_URL,
    NODE_ENV: env.NODE_ENV,
    FRONTEND_ORIGIN: env.FRONTEND_ORIGIN,
    AUTH_SECRET: env.AUTH_SECRET,
    COOKIE_SECRET: env.COOKIE_SECRET,
    CLOUDINARY_CLOUD_NAME: env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: env.CLOUDINARY_API_SECRET,
  };
};

export const env = getEnvVariables();
