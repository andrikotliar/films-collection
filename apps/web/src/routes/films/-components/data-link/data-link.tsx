import { ReactNode } from 'react';
import { Link } from '@tanstack/react-router';
import { FileRoutesByTo } from '~/routeTree.gen';
import styles from './styles.module.css';

export type DataLinkProps = {
  basePath: keyof FileRoutesByTo;
  query: { [key: string]: unknown };
  children?: ReactNode;
};

export const DataLink = ({ basePath, query, children }: DataLinkProps) => {
  return (
    <Link to={basePath} search={query} className={styles.link}>
      {children}
    </Link>
  );
};
