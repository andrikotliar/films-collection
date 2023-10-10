import { CSSProperties } from 'react';
import { PropsWithClassName } from '@/types/props-with-class.type';

type IconType = PropsWithClassName<{
  color?: CSSProperties['color'];
}>;

export type { IconType };
