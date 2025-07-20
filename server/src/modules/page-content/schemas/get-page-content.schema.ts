import { Type } from '@sinclair/typebox';

export const GetPageContentByPageUrlParamsSchema = Type.Object({
  pageUrl: Type.String(),
});
