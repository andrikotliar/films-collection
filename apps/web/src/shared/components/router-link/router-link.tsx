import clsx from 'clsx';
import { Link, type LinkProps } from '@tanstack/react-router';
import styles from "./router-link.module.css";
import type { PropsWithClassName } from '~/shared/types';

export const RouterLink = ({ children, className, ...props }: PropsWithClassName<LinkProps>) => {
  return (
    <Link className={clsx(styles.link, className)} {...props}>
      {children}
    </Link>
  );
};
