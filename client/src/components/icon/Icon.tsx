import { FC, SVGAttributes, createElement } from 'react';
import { IconNames } from './types';
import { iconsMap } from './icons-map';

type IconsProps = {
  name: IconNames;
  size?: number;
} & SVGAttributes<SVGElement>;

const Icon: FC<IconsProps> = ({ name, size = 24, ...props }) => {
  return createElement(iconsMap[name], {
    width: size,
    height: size,
    ...props,
  });
};

export { Icon, type IconsProps };
