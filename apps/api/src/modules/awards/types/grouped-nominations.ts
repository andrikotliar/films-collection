import { Prisma } from '@prisma/client';
import { NominationInput } from '~/modules/awards/schemas';

export type GroupedNominations = {
  create: Pick<Prisma.NominationUncheckedCreateInput, 'title' | 'shouldIncludeActor' | 'awardId'>[];
  update: NominationInput[];
};
