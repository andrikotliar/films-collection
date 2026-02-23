import type { NominationInput } from '@films-collection/shared';

type CreateNominationInput = Omit<NominationInput, 'id'> & {
  awardId: number;
};

export type GroupedNominations = {
  create: CreateNominationInput[];
  update: NominationInput[];
};
