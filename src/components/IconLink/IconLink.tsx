import { PropsWithClassName } from '@/common';
import classes from './IconLink.module.css';
import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

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
    <Link to={path} className={classNames(classes.iconLink, className)}>
      {icon}
    </Link>
  );
};

export { IconLink };
