import { Type } from '@sinclair/typebox';
import { Destination } from '../enums';

export const UploadSchema = Type.Object({
  destination: Type.Enum(Destination),
  title: Type.String(),
});
