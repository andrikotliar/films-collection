import { FunctionComponent, SVGAttributes } from 'react';

type IconsMap = Record<IconNames, FunctionComponent<SVGAttributes<SVGElement>>>;

type IconNames =
  | 'oscarAward'
  | 'goldenGlobeAward'
  | 'saturnAward'
  | 'baftaAward'
  | 'annieAward'
  | 'emmyAward'
  | 'criticsChoiceAward'
  | 'jupiterAward'
  | 'mtvAward';

export type { IconsMap, IconNames };
