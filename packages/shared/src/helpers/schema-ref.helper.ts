import type z from 'zod';

export type SchemaRef<Name extends string, T extends z.ZodType> = {
  readonly __schemaName: Name;
  readonly value: T;
};

export const schemaRef = <Name extends string, T extends z.ZodType>(
  name: Name,
  schema: T,
): SchemaRef<Name, T> => ({
  __schemaName: name,
  value: schema,
});
