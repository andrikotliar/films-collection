import { FC, PropsWithChildren } from 'react';
import { Link, LinkProps } from '@tanstack/react-router';
import styles from './TagLink.module.css';
import classNames from 'classnames';
import { FileRoutesByTo } from '@/routeTree.gen';

export type TagLinkProps = {
  path: keyof FileRoutesByTo;
  searchParams?: LinkProps['search'];
  variant?:
    | 'blue'
    | 'sand'
    | 'gray'
    | 'pink'
    | 'red'
    | 'mint'
    | 'purple'
    | 'green';
  isDisabled?: boolean;
};

export const TagLink: FC<PropsWithChildren<TagLinkProps>> = ({
  path,
  children,
  variant = 'sand',
  isDisabled = false,
  searchParams,
}) => {
  return (
    <Link
      to={path}
      search={searchParams}
      className={classNames(styles.link, styles[variant], {
        [styles.disabled]: isDisabled,
      })}
    >
      {children}
    </Link>
  );
};
