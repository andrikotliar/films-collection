import z from 'zod';

export const buildListOptionSchema = <T extends z.ZodType>(schema: T) => {
  return z.array(
    z.object({
      label: z.string(),
      value: schema,
    }),
  );
};
