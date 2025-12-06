import styles from "./icon-link.module.css";
import { Link, type LinkProps } from '@tanstack/react-router';
import { type ReactNode } from 'react';

type IconLinkProps = Omit<LinkProps, 'className' | 'children'> & {
  icon: ReactNode;
};

export const IconLink = ({ icon, ...props }: IconLinkProps) => {
  return (
    <Link className={styles.icon_link} {...props}>
      {icon}
    </Link>
  );
};
