import { Prisma } from '@prisma/client';
import { NominationInput } from 'src/modules/awards/schemas';

export type GroupedNominations = {
  create: Pick<
    Prisma.NominationUncheckedCreateInput,
    'title' | 'shouldIncludeActor' | 'awardId'
  >[];
  update: NominationInput[];
};
