import { ArrowLeftIcon } from 'lucide-react';
import styles from './back-link.module.css';
import { Link } from '@tanstack/react-router';
import type { FileRoutesByTo } from '~/routeTree.gen';

type BackLinkProps = {
  path: keyof FileRoutesByTo;
  children: React.ReactNode;
};

export const BackLink = ({ path, children }: BackLinkProps) => {
  return (
    <Link to={path} className={styles.back_link}>
      <ArrowLeftIcon />
      <span>{children}</span>
    </Link>
  );
};
