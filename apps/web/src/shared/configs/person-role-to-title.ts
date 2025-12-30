import type { Enum, PersonRole } from '@films-collection/shared';

export const personRoleToTitle: Record<Enum<typeof PersonRole>, string> = {
  DIRECTOR: 'Directed by',
  CREATOR: 'Created by',
  WRITER: 'Written by',
  COMPOSER: 'Music by',
  CAMERAMAN: 'Cinematography by',
  PRODUCER: 'Produced by',
  ACTOR: 'Cast',
};
