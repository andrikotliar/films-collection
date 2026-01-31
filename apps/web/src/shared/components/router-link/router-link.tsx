import clsx from 'clsx';
import { Link, type LinkProps } from '@tanstack/react-router';
import styles from './router-link.module.css';

type RouterLinkProps = {
  className?: string;
} & LinkProps;

export const RouterLink = ({ children, className, ...props }: RouterLinkProps) => {
  return (
    <Link className={clsx(styles.link, className)} {...props}>
      {children}
    </Link>
  );
};
