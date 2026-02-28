import type { CreateAwardInput } from '@films-collection/shared';
import type { GroupedNominations } from '~/modules/awards/types/grouped-nominations';

export type UpdateAwardParams = {
  awardId: number;
  award: Omit<CreateAwardInput, 'nominations'>;
  updateNominations: GroupedNominations['update'];
  createNominations: GroupedNominations['create'];
  deleteNominations: number[];
};
