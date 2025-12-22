import z from 'zod';

export const GetPageContentByPageUrlParamsSchema = z.object({
  pageKey: z.string(),
});

export const GetPageContentListQueriesSchema = z.object({
  skip: z.number(),
});

export const CreatePageContentInputSchema = z.object({
  title: z.string(),
  pageKey: z.string(),
  content: z.string(),
});

export const UpdatePageContentInputSchema = CreatePageContentInputSchema.partial();

export type GetPageContentByPageUrlParams = z.infer<typeof GetPageContentByPageUrlParamsSchema>;
export type GetPageContentListQueries = z.infer<typeof GetPageContentListQueriesSchema>;
export type CreatePageContentInput = z.infer<typeof CreatePageContentInputSchema>;
export type UpdatePageContentInput = z.infer<typeof UpdatePageContentInputSchema>;
