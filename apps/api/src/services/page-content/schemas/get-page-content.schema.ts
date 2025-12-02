import { Type } from '@sinclair/typebox';

export const GetPageContentByPageUrlParamsSchema = Type.Object({
  pageKey: Type.String(),
});
