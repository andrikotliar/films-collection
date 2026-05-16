import type { Enum } from '~/types/enum.type.js';

export const CollectionCategory = {
  GENERAL: 'GENERAL',
  CINEMATIC_UNIVERSE: 'CINEMATIC_UNIVERSE',
  TOP: 'TOP',
} as const;

export type TCollectionCategory = Enum<typeof CollectionCategory>;
