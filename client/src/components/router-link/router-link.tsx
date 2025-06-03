import classNames from 'classnames';
import { FC } from 'react';
import { Link, LinkProps } from '@tanstack/react-router';
import styles from './router-link.module.css';

type RouterLinkProps = LinkProps & {
  className?: string;
};

export const RouterLink: FC<RouterLinkProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <Link className={classNames(styles.link, className)} {...props}>
      {children}
    </Link>
  );
};
