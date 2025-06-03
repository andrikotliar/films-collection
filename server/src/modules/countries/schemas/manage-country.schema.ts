import { Static, Type } from '@sinclair/typebox';

export const ManageCountryBodySchema = Type.Object({
  title: Type.String(),
});

export type ManageCountryInput = Static<typeof ManageCountryBodySchema>;
