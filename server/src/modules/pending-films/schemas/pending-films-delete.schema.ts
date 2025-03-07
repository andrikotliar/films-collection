import { Static, Type } from '@sinclair/typebox';

export const PendingFilmsDeleteParamsSchema = Type.Object({
  id: Type.Number(),
});

export type PendingFilmsDeleteParams = Static<
  typeof PendingFilmsDeleteParamsSchema
>;
