import z from 'zod';
import { schemaRef } from '~/helpers';
import type { InferSchema } from '~/types';

export const GetPageContentByPageUrlParamsSchemaRef = schemaRef(
  'GetPageContentByPageUrlParamsSchemaRef',
  z.object({
    pageKey: z.string(),
  }),
);

export const GetPageContentListQueriesSchemaRef = schemaRef(
  'GetListQueriesSchemaRef',
  z.object({
    skip: z.number(),
  }),
);

export const CreatePageContentInputSchemaRef = schemaRef(
  'CreatePageContentInputSchemaRef',
  z.object({
    title: z.string(),
    pageKey: z.string(),
    content: z.string(),
  }),
);

export const UpdatePageContentInputSchemaRef = schemaRef(
  'UpdatePageContentInputSchemaRef',
  CreatePageContentInputSchemaRef.value.partial(),
);

export type GetPageContentByPageUrlParams = InferSchema<
  typeof GetPageContentByPageUrlParamsSchemaRef
>;
export type GetPageContentListQueries = InferSchema<typeof GetPageContentListQueriesSchemaRef>;
export type CreatePageContentInput = InferSchema<typeof CreatePageContentInputSchemaRef>;
export type UpdatePageContentInput = InferSchema<typeof UpdatePageContentInputSchemaRef>;
