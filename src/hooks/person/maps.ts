import { PersonRole } from '@/common/enums';

const mapPositionIdToTitle = {
  [PersonRole.ACTOR]: 'Actor',
  [PersonRole.DIRECTOR]: 'Director',
  [PersonRole.WRITER]: 'Writer',
  [PersonRole.PRODUCER]: 'Producer',
  [PersonRole.MUSIC]: 'Composer',
  [PersonRole.CINEMATOGRAPHY]: 'Cameraman',
  [PersonRole.SERIES_CREATOR]: 'Series creator',
  [PersonRole.UNKNOWN]: 'Crew member',
};

export { mapPositionIdToTitle };
