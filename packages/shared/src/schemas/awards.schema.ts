import z from 'zod';
import { schemaRef } from '~/helpers/schema-ref.helper';
import type { InferSchema } from '~/types';

const NominationInputSchemaRef = schemaRef(
  'NominationInputSchemaRef',
  z.object({
    id: z.number(),
    title: z.string(),
    shouldIncludeActor: z.boolean(),
  }),
);

const BaseAwardSchema = z.object({
  title: z.string(),
  description: z.string().nullable(),
});

export const CreateAwardInputSchemaRef = schemaRef(
  'CreateAwardInputSchemaRef',
  z.object({
    ...BaseAwardSchema.shape,
    nominations: z.array(NominationInputSchemaRef.value),
  }),
);

export const FindNominationsQuerySchemaRef = schemaRef(
  'FindNominationsQuerySchemaRef',
  z.object({
    awardId: z.number().nullable(),
  }),
);

export const UpdateAwardInputSchemaRef = schemaRef(
  'UpdateAwardInputSchemaRef',
  BaseAwardSchema.partial(),
);

export type CreateAwardInput = InferSchema<typeof CreateAwardInputSchemaRef>;
export type NominationInput = InferSchema<typeof NominationInputSchemaRef>;
export type FindNominationsQuery = InferSchema<typeof FindNominationsQuerySchemaRef>;
export type UpdateAwardInput = InferSchema<typeof UpdateAwardInputSchemaRef>;
