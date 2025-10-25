import clsx from 'clsx';
import { Link, LinkProps } from '@tanstack/react-router';
import styles from './styles.module.css';

type RouterLinkProps = LinkProps & {
  className?: string;
};

export const RouterLink = ({ children, className, ...props }: RouterLinkProps) => {
  return (
    <Link className={clsx(styles.link, className)} {...props}>
      {children}
    </Link>
  );
};
