import { Link } from '@tanstack/react-router';
import { type FileRoutesByTo } from '~/routeTree.gen';
import styles from './data-link.module.css';
import type { PropsWithChildren } from 'react';

export type DataLinkProps = {
  basePath: keyof FileRoutesByTo;
  query: { [key: string]: unknown };
};
export const DataLink = ({ basePath, query, children }: PropsWithChildren<DataLinkProps>) => {
  return (
    <Link to={basePath} search={query} className={styles.link}>
      {children}
    </Link>
  );
};
