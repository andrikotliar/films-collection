import { Type } from '@sinclair/typebox';

export const GetPostByKeyParamsSchema = Type.Object({
  pageKey: Type.String(),
});

export const GetPostByIdParamsSchema = Type.Object({
  id: Type.Number(),
});
