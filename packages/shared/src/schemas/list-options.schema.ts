import z from 'zod';

export function buildListOptionSchema<T extends z.ZodTypeAny, P extends z.ZodRawShape>(
  schema: T,
  params: z.ZodObject<P>,
): z.ZodArray<
  z.ZodObject<
    {
      label: z.ZodString;
      value: T;
    } & P
  >
>;
export function buildListOptionSchema<T extends z.ZodTypeAny>(
  schema: T,
): z.ZodArray<
  z.ZodObject<{
    label: z.ZodString;
    value: T;
  }>
>;
export function buildListOptionSchema<T extends z.ZodType, P extends z.ZodRawShape = {}>(
  schema: T,
  params?: z.ZodObject<P>,
) {
  const base = z.object({
    label: z.string(),
    value: schema,
  });

  const finalSchema = params ? base.extend(params.shape) : base;

  return z.array(finalSchema);
}
