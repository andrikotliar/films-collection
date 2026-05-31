import type { Enum } from '~/types/enum.type.js';

export const TitleStyle = {
  LIVE_ACTION: 'LIVE_ACTION',
  ANIMATION: 'ANIMATION',
} as const;

export type TTitleStyle = Enum<typeof TitleStyle>;
