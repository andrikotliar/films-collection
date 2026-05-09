import type { Enum } from '~/types';

export const CollectionCategory = {
  GENERAL: 'GENERAL',
  CINEMATIC_UNIVERSE: 'CINEMATIC_UNIVERSE',
  TOP: 'TOP',
} as const;

export type TCollectionCategory = Enum<typeof CollectionCategory>;
