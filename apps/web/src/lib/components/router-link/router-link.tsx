import clsx from 'clsx';
import { Link, type LinkProps } from '@tanstack/react-router';
import styles from './styles.module.css';
import type { PropsWithClassName } from '~/lib/types';

export const RouterLink = ({ children, className, ...props }: PropsWithClassName<LinkProps>) => {
  return (
    <Link className={clsx(styles.link, className)} {...props}>
      {children}
    </Link>
  );
};
