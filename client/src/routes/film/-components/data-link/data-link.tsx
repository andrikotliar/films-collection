import { FC, PropsWithChildren } from 'react';
import { Link } from '@tanstack/react-router';
import { FileRoutesByTo } from '@/routeTree.gen';
import styles from './data-link.module.css';

export type DataLinkProps = {
  basePath: keyof FileRoutesByTo;
  query: { [key: string]: unknown };
};

export const DataLink: FC<PropsWithChildren<DataLinkProps>> = ({
  basePath,
  query,
  children,
}) => {
  return (
    <Link to={basePath} search={query} className={styles.link}>
      {children}
    </Link>
  );
};
