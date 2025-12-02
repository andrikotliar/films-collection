import type { PersonRole } from '~/shared/types';

export const personRoleToTitle: Record<PersonRole, string> = {
  DIRECTOR: 'Directed by',
  CREATOR: 'Created by',
  WRITER: 'Written by',
  COMPOSER: 'Music by',
  CAMERAMAN: 'Cinematography by',
  PRODUCER: 'Produced by',
  ACTOR: 'Cast',
};
