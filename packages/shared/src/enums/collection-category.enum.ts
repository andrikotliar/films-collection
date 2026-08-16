import type { Enum } from '~/types/enum.type.js';

export const CollectionCategory = {
  GENERAL: 'GENERAL',
  CINEMATIC_UNIVERSE: 'CINEMATIC_UNIVERSE',
  CHAPTER: 'CHAPTER',
  TOP: 'TOP',
  HOBBY_ITEM_CHAPTER: 'HOBBY_ITEM_CHAPTER',
} as const;

export type TCollectionCategory = Enum<typeof CollectionCategory>;
