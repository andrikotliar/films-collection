import { Type } from '@sinclair/typebox';

export const GetPostByKeyParamsSchema = Type.Object({
  pageKey: Type.String(),
});
