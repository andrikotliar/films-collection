import { IconsMap } from '../types';

import OscarIcon from '@/assets/icons/awards/oscar.svg?react';
import AnnieIcon from '@/assets/icons/awards/annie.svg?react';
import BaftaIcon from '@/assets/icons/awards/bafta.svg?react';
import CriticsChoiceIcon from '@/assets/icons/awards/critics-choice.svg?react';
import EmmyIcon from '@/assets/icons/awards/emmy.svg?react';
import GoldenGlobeIcon from '@/assets/icons/awards/golden-globe.svg?react';
import JupiterIcon from '@/assets/icons/awards/jupiter.svg?react';
import MtvIcon from '@/assets/icons/awards/mtv.svg?react';
import SaturnIcon from '@/assets/icons/awards/saturn.svg?react';
import { Award } from '@/enums';

const iconsMap: IconsMap = {
  [Award.OSCAR_AWARD]: OscarIcon,
  [Award.ANNIE_AWARD]: AnnieIcon,
  [Award.BAFTA_AWARD]: BaftaIcon,
  [Award.CRITICS_CHOICE_AWARD]: CriticsChoiceIcon,
  [Award.EMMY_AWARD]: EmmyIcon,
  [Award.GOLDEN_GLOBE_AWARD]: GoldenGlobeIcon,
  [Award.JUPITER_AWARD]: JupiterIcon,
  [Award.MTV_AWARD]: MtvIcon,
  [Award.SATURN_AWARD]: SaturnIcon,
};

export { iconsMap };
