import { Link } from '@tanstack/react-router';
import { type FileRoutesByTo } from '~/routeTree.gen';
import styles from './data-link.module.css';
import type { PropsWithChildren } from 'react';
import clsx from 'clsx';

export type DataLinkProps = {
  basePath: keyof FileRoutesByTo;
  query: { [key: string]: unknown };
  markerColor?: 'white' | 'green' | 'red';
};

const markerColorToClassName = {
  white: styles.whiteMarker,
  green: styles.greenMarker,
  red: styles.redMarker,
};

export const DataLink = ({
  basePath,
  query,
  children,
  markerColor = 'white',
}: PropsWithChildren<DataLinkProps>) => {
  return (
    <Link
      to={basePath}
      search={query}
      className={clsx(styles.link, markerColorToClassName[markerColor])}
    >
      {children}
    </Link>
  );
};
