import z from 'zod';
import { schemaRef } from '~/helpers';

export const IdParamSchemaRef = schemaRef(
  'IdParamSchemaRef',
  z.object({
    id: z.number(),
  }),
);
