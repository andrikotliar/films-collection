import z from 'zod';

export const buildListOptionSchema = <T extends z.ZodType, P extends z.ZodObject>(
  schema: T,
  params?: P,
) => {
  return z.array(
    z.object({
      label: z.string(),
      value: schema,
      ...params?.shape,
    }),
  );
};
