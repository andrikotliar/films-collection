import type { Enum } from '~/types/enum.type.js';

export const DraftLevel = {
  PUBLISHED: 'PUBLISHED',
  UPCOMING: 'UPCOMING',
  PENDING: 'PENDING',
} as const;

export type TDraftLevel = Enum<typeof DraftLevel>;
