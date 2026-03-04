import { z } from 'zod';
import 'dotenv/config';

export const ExportFilmScriptSchema = z.object({
  FILMS_EXPORT_URL: z.string(),
  SIGNATURE_SECRET: z.string(),
});

export const getEnvironment = <TSchema extends z.ZodType>(schema: TSchema): z.output<TSchema> => {
  return schema.parse(process.env);
};
