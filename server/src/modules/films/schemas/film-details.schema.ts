import { Static, Type } from '@sinclair/typebox';

export const FilmsGetParamsSchema = Type.Object(
  {
    id: Type.Number(),
  },
  { additionalProperties: false },
);

export type FilmsGetParams = Static<typeof FilmsGetParamsSchema>;
