import type { Enum } from '~/types';

export const TitleStyle = {
  LIVE_ACTION: 'LIVE_ACTION',
  ANIMATION: 'ANIMATION',
} as const;

export type TTitleStyle = Enum<typeof TitleStyle>;
