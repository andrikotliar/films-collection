import { CSSProperties } from 'react';
import { PropsWithClassName } from './props-with-class.type';

export type IconType = PropsWithClassName<{
  color?: CSSProperties['color'];
}>;
