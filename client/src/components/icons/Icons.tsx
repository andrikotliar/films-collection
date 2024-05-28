import { FC, SVGAttributes } from 'react';
import { IconNames } from './types';
import { iconsMap } from './maps';

type IconsProps = {
  icon: IconNames;
  size?: number;
} & SVGAttributes<SVGElement>;

const Icons: FC<IconsProps> = ({ icon, size = 24, ...props }) => {
  const IconComponent = iconsMap[icon];

  return <IconComponent width={size} height={size} {...props} />;
};

export { Icons, type IconsProps };
