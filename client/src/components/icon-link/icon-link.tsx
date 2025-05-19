import styles from './icon-link.module.css';
import { Link, LinkProps } from '@tanstack/react-router';
import { FC, ReactNode } from 'react';

type IconLinkProps = Omit<LinkProps, 'className' | 'children'> & {
  icon: ReactNode;
};

export const IconLink: FC<IconLinkProps> = ({ icon, ...props }) => {
  return (
    <Link className={styles.iconLink} {...props}>
      {icon}
    </Link>
  );
};
