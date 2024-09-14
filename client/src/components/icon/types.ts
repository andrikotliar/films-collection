import { Award } from '@/enums';
import { FunctionComponent, SVGAttributes } from 'react';

type IconsMap = Record<IconNames, FunctionComponent<SVGAttributes<SVGElement>>>;

type IconNames = Award;

export type { IconsMap, IconNames };
