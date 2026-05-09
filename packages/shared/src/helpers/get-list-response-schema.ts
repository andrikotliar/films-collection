import z from 'zod';

export function getListResponseSchema<T extends z.ZodTypeAny, P extends z.ZodRawShape>(
  dataSchema: T,
  otherData?: z.ZodObject<P>,
): z.ZodObject<
  {
    list: T;
    total: z.ZodNumber;
    pageLimit: z.ZodNumber;
  } & P
>;

export function getListResponseSchema<T extends z.ZodTypeAny>(
  dataSchema: T,
): z.ZodObject<{
  list: T;
  total: z.ZodNumber;
  pageLimit: z.ZodNumber;
}>;

export function getListResponseSchema<T extends z.ZodType, P extends z.ZodRawShape = {}>(
  dataSchema: T,
  otherData?: z.ZodObject<P>,
) {
  const base = z.object({
    list: dataSchema,
    total: z.number(),
    pageLimit: z.number(),
  });

  if (otherData) {
    base.extend(otherData);
  }

  return base;
}
