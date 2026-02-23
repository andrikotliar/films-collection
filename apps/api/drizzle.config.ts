import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  schema: './src/database/schema.ts',
  out: './src/database/migrations',
  dialect: 'postgresql',
});
