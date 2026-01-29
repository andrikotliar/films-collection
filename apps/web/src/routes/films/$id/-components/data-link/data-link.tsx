import { Link } from '@tanstack/react-router';
import { type FileRoutesByTo } from '~/routeTree.gen';
import styles from './data-link.module.css';

export type DataLinkProps = {
  basePath: keyof FileRoutesByTo;
  query: { [key: string]: unknown };
  children: React.ReactNode;
};
export const DataLink = ({ basePath, query, children }: DataLinkProps) => {
  return (
    <Link to={basePath} search={query} className={styles.link}>
      {children}
    </Link>
  );
};
