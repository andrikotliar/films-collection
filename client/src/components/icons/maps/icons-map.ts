import { IconsMap } from '../types';

// Award Icons Import
import OscarIcon from '@/assets/icons/awards/oscar.svg?react';
import AnnieIcon from '@/assets/icons/awards/annie.svg?react';
import BaftaIcon from '@/assets/icons/awards/bafta.svg?react';
import CriticsChoiceIcon from '@/assets/icons/awards/critics-choice.svg?react';
import EmmyIcon from '@/assets/icons/awards/emmy.svg?react';
import GoldenGlobeIcon from '@/assets/icons/awards/golden-globe.svg?react';
import JupiterIcon from '@/assets/icons/awards/jupiter.svg?react';
import MtvIcon from '@/assets/icons/awards/mtv.svg?react';
import SaturnIcon from '@/assets/icons/awards/saturn.svg?react';

// UI Icons Import
import CheckIcon from '@/assets/icons/ui/check.svg?react';
import ChevronUpIcon from '@/assets/icons/ui/chevron-up.svg?react';
import ChevronDownIcon from '@/assets/icons/ui/chevron-down.svg?react';
import ChevronLeftIcon from '@/assets/icons/ui/chevron-left.svg?react';
import ChevronRightIcon from '@/assets/icons/ui/chevron-right.svg?react';
import CloseIcon from '@/assets/icons/ui/close.svg?react';
import MenuIcon from '@/assets/icons/ui/menu.svg?react';
import PlayIcon from '@/assets/icons/ui/play.svg?react';
import ResetIcon from '@/assets/icons/ui/reset.svg?react';
import SearchIcon from '@/assets/icons/ui/search.svg?react';
import SliderIcon from '@/assets/icons/ui/slider.svg?react';
import LoaderIcon from '@/assets/icons/ui/loader.svg?react';

const iconsMap: IconsMap = {
  // UI
  check: CheckIcon,
  chevronUp: ChevronUpIcon,
  chevronDown: ChevronDownIcon,
  chevronLeft: ChevronLeftIcon,
  chevronRight: ChevronRightIcon,
  close: CloseIcon,
  menu: MenuIcon,
  play: PlayIcon,
  reset: ResetIcon,
  search: SearchIcon,
  slider: SliderIcon,
  loader: LoaderIcon,

  // Awards
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

export { iconsMap };
