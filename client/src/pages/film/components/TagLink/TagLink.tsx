import { FC, PropsWithChildren } from 'react';
import { Link } from '@tanstack/react-router';
import styles from './TagLink.module.css';
import classNames from 'classnames';
import { FileRoutesByTo } from '@/routeTree.gen';

export type TagLinkProps = {
  basePath: keyof FileRoutesByTo;
  query: { [key: string]: unknown };
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
  basePath,
  children,
  variant = 'sand',
  isDisabled = false,
  query,
}) => {
  return (
    <Link
      to={basePath}
      className={classNames(styles.link, styles[variant], {
        [styles.disabled]: isDisabled,
      })}
      search={query}
    >
      {children}
    </Link>
  );
};
