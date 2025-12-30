import z from 'zod';

// TODO: extend the form validation
export const FilmFormSchema = z.object({
  title: z.string(),
});
