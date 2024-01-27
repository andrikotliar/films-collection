import { PropsWithClassName } from '@/common';
import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';

type IconLinkProps = {
  path: string;
  icon: ReactNode;
};

const IconLink: FC<PropsWithClassName<IconLinkProps>> = ({
  path,
  icon,
  className,
}) => {
  return (
    <Link to={path} className={className}>
      {icon}
    </Link>
  );
};

export { IconLink };
