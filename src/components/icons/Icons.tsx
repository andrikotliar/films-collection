import { FC, SVGAttributes } from 'react';

import OscarIcon from '@/assets/icons/awards/oscar.svg?react';
import AnnieIcon from '@/assets/icons/awards/annie.svg?react';
import BaftaIcon from '@/assets/icons/awards/bafta.svg?react';
import CriticsChoiceIcon from '@/assets/icons/awards/critics-choice.svg?react';
import EmmyIcon from '@/assets/icons/awards/emmy.svg?react';
import GoldenGlobeIcon from '@/assets/icons/awards/golden-globe.svg?react';
import JupiterIcon from '@/assets/icons/awards/jupiter.svg?react';
import MtvIcon from '@/assets/icons/awards/mtv.svg?react';
import SaturnIcon from '@/assets/icons/awards/saturn.svg?react';

import { IconsMap, IconNames } from './types';

const iconsMap: IconsMap = {
  oscarAward: OscarIcon,
  annieAward: AnnieIcon,
  baftaAward: BaftaIcon,
  criticsChoiceAward: CriticsChoiceIcon,
  emmyAward: EmmyIcon,
  goldenGlobeAward: GoldenGlobeIcon,
  jupiterAward: JupiterIcon,
  mtvAward: MtvIcon,
  saturnAward: SaturnIcon,
};

type Props = {
  icon: IconNames;
  size?: number;
} & SVGAttributes<SVGElement>;

const Icons: FC<Props> = ({ icon, size = 24, ...props }) => {
  const IconComponent = iconsMap[icon];

  return <IconComponent width={size} height={size} {...props} />;
};

export { Icons };
