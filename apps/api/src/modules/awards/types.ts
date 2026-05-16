import type { CreateAwardInput, NominationInput } from '@films-collection/shared';

export type GroupedNominations = {
  create: CreateNominationInput[];
  update: NominationInput[];
};

export type UpdateAwardParams = {
  awardId: number;
  award: Omit<CreateAwardInput, 'nominations'>;
  updateNominations: GroupedNominations['update'];
  createNominations: GroupedNominations['create'];
  deleteNominations: number[];
};

type CreateNominationInput = Omit<NominationInput, 'id'> & {
  awardId: number;
};
