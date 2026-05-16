import type { Enum } from '~/types/enum.type.js';

export const PersonRole = {
  DIRECTOR: 'DIRECTOR',
  WRITER: 'WRITER',
  PRODUCER: 'PRODUCER',
  COMPOSER: 'COMPOSER',
  CAMERAMAN: 'CAMERAMAN',
  CREATOR: 'CREATOR',
  ACTOR: 'ACTOR',
} as const;

export type TPersonRole = Enum<typeof PersonRole>;
