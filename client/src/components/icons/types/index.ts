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
  | 'mtvAward'
  | 'check'
  | 'chevronUp'
  | 'chevronDown'
  | 'chevronLeft'
  | 'chevronRight'
  | 'close'
  | 'menu'
  | 'play'
  | 'reset'
  | 'search'
  | 'slider'
  | 'loader';

export type { IconsMap, IconNames };
