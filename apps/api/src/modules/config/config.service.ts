import 'dotenv/config';
import z from 'zod';

const EnvSchema = z.object({
  SERVER_PORT: z.string().transform((value) => Number(value)),
  SERVER_HOST: z.string().optional(),
  AUTH_SECRET: z.string(),
  COOKIE_SECRET: z.string(),
  NODE_ENV: z.string().optional(),
  DATABASE_URL: z.string(),
  SIGNATURE_SECRET: z.string(),
  AWS_REGION: z.string(),
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
  S3_ENDPOINT: z.string().optional(),
  S3_ASSETS_BUCKET: z.string(),
  OPENAI_API_KEY: z.string(),
});

export type EnvVariables = z.infer<typeof EnvSchema>;

export class ConfigService {
  private env: EnvVariables | undefined;

  getKey<K extends keyof EnvVariables>(key: K): z.infer<typeof EnvSchema>[K] {
    if (!this.env) {
      this.env = EnvSchema.parse(process.env);

      return this.env[key];
    }

    return this.env[key];
  }
}
