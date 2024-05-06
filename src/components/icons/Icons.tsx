import { FC, SVGAttributes } from 'react';
import { IconNames } from './types';
import { iconsMap } from './maps';

type Props = {
  icon: IconNames;
  size?: number;
} & SVGAttributes<SVGElement>;

const Icons: FC<Props> = ({ icon, size = 24, ...props }) => {
  const IconComponent = iconsMap[icon];

  return <IconComponent width={size} height={size} {...props} />;
};

export { Icons };
