import { PersonRole } from '@/enums';

const personRoleTitles = {
  [PersonRole.DIRECTOR]: 'Directed by',
  [PersonRole.WRITER]: 'Written by',
  [PersonRole.PRODUCER]: 'Produced by',
  [PersonRole.MUSIC]: 'Music by',
  [PersonRole.CINEMATOGRAPHY]: 'Cinematography by',
  [PersonRole.SERIES_CREATOR]: 'Created by',
};

export { personRoleTitles };
