import { ArrowLeftIcon } from 'lucide-react';
import { type PropsWithChildren } from 'react';
import styles from './back-link.module.css';
import { Link } from '@tanstack/react-router';
import type { FileRoutesByTo } from '~/routeTree.gen';

type BackLinkProps = {
  path: keyof FileRoutesByTo;
};

export const BackLink = ({ path, children }: PropsWithChildren<BackLinkProps>) => {
  return (
    <Link to={path} className={styles.back_link}>
      <ArrowLeftIcon />
      <span>{children}</span>
    </Link>
  );
};
