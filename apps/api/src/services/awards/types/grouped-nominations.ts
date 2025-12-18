import type { NominationInput } from '@films-collection/shared';
import type { Prisma } from '@prisma/client';

export type GroupedNominations = {
  create: Pick<Prisma.NominationUncheckedCreateInput, 'title' | 'shouldIncludeActor' | 'awardId'>[];
  update: NominationInput[];
};
