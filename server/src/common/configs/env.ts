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
  AWS_ACCESS_KEY: string;
  AWS_SECRET_KEY: string;
  AWS_REGION: string;
  AWS_S3_BUCKET: string;
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
  'AWS_ACCESS_KEY',
  'AWS_SECRET_KEY',
  'AWS_REGION',
  'AWS_S3_BUCKET',
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
    AWS_ACCESS_KEY: env.AWS_ACCESS_KEY,
    AWS_SECRET_KEY: env.AWS_SECRET_KEY,
    AWS_REGION: env.AWS_REGION,
    AWS_S3_BUCKET: env.AWS_S3_BUCKET,
  };
};

export const env = getEnvVariables();
