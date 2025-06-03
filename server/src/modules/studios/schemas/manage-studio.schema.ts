import { Static, Type } from '@sinclair/typebox';

export const ManageStudioBodySchema = Type.Object({
  title: Type.String(),
});

export type ManageStudioInput = Static<typeof ManageStudioBodySchema>;
