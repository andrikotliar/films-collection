import { PropsWithClassName } from '@/common/types';
import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';

type Props = {
  path: string;
  icon: ReactNode;
};

const IconLink: FC<PropsWithClassName<Props>> = ({ path, icon, className }) => {
  return (
    <Link to={path} className={className}>
      {icon}
    </Link>
  );
};

export { IconLink };
