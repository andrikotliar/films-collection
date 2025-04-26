import { Type } from '@sinclair/typebox';

export const UploadSchema = Type.Object({
  destination: Type.String(),
  title: Type.String(),
});
