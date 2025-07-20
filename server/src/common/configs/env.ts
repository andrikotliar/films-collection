import 'dotenv/config';
import z from 'zod';

const EnvSchema = z.object({
  SERVER_PORT: z.string().transform((value) => Number(value)),
  SERVER_HOST: z.string().optional(),
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_DB: z.string(),
  POSTGRES_HOST: z.string(),
  POSTGRES_PORT: z.string().transform((value) => Number(value)),
  AUTH_SECRET: z.string(),
  COOKIE_SECRET: z.string(),
  CLOUDINARY_CLOUD_NAME: z.string(),
  CLOUDINARY_API_KEY: z.string(),
  CLOUDINARY_API_SECRET: z.string(),
  FRONTEND_ORIGIN: z.string(),
  NODE_ENV: z.string().optional(),
  DATABASE_URL: z.string(),
});

export type EnvVariables = z.infer<typeof EnvSchema>;

const getEnvVariables = (): EnvVariables => {
  try {
    return EnvSchema.parse(process.env);
  } catch (error: any) {
    console.error(error);
    process.exit(1);
  }
};

export const env = getEnvVariables();
