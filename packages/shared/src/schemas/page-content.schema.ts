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

export const PageContentResponseSchema = z.object({
  id: z.number(),
  title: z.number(),
  content: z.string(),
  pageKey: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const PageContentsListResponseSchema = z.object({
  list: z.array(PageContentResponseSchema.omit({ createdAt: true, updatedAt: true })),
  count: z.number(),
});

export const PageContentByKeyResponseSchema = PageContentResponseSchema.pick({
  id: true,
  title: true,
  content: true,
});

export const PageContentByIdResponseSchema = PageContentResponseSchema.omit({
  createdAt: true,
  updatedAt: true,
}).nullable();

export type GetPageContentByPageUrlParams = z.infer<typeof GetPageContentByPageUrlParamsSchema>;
export type GetPageContentListQueries = z.infer<typeof GetPageContentListQueriesSchema>;
export type CreatePageContentInput = z.infer<typeof CreatePageContentInputSchema>;
export type UpdatePageContentInput = z.infer<typeof UpdatePageContentInputSchema>;
