import { PersonRole } from '@/common/enums';

const personRoleToCrewTitle = {
  [PersonRole.ACTOR]: 'Actor',
  [PersonRole.DIRECTOR]: 'Directed by',
  [PersonRole.WRITER]: 'Written by',
  [PersonRole.PRODUCER]: 'Produced by',
  [PersonRole.MUSIC]: 'Music by',
  [PersonRole.CINEMATOGRAPHY]: 'Cinematography by',
  [PersonRole.SERIES_CREATOR]: 'Created by',
  [PersonRole.SPECIAL_EFFECTS]: 'Special Effects',
  [PersonRole.PRODUCTION_DESIGN]: 'Production Design By',
  [PersonRole.SOUND_DEPARTMENT]: 'Sound Department',
  [PersonRole.ANIMATOR]: 'Animation by',
  [PersonRole.UNKNOWN]: 'Other',
};

const personRoleToPageTitle = {
  [PersonRole.ACTOR]: 'Actor',
  [PersonRole.DIRECTOR]: 'Director',
  [PersonRole.WRITER]: 'Writer',
  [PersonRole.PRODUCER]: 'Producer',
  [PersonRole.MUSIC]: 'Composer',
  [PersonRole.CINEMATOGRAPHY]: 'Cameraman',
  [PersonRole.SERIES_CREATOR]: 'Series creator',
  [PersonRole.SPECIAL_EFFECTS]: 'Special effects specialist',
  [PersonRole.PRODUCTION_DESIGN]: 'Production designer',
  [PersonRole.SOUND_DEPARTMENT]: 'Sound Department Member',
  [PersonRole.ANIMATOR]: 'Animator',
  [PersonRole.UNKNOWN]: 'Crew member',
};

export { personRoleToCrewTitle, personRoleToPageTitle };
