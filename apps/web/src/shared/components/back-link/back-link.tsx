import { ArrowLeftIcon } from 'lucide-react';
import styles from './back-link.module.css';
import { Link } from '@tanstack/react-router';
import type { FileRoutesByTo } from '~/routeTree.gen';

type BackLinkProps = {
  path: keyof FileRoutesByTo;
  children: React.ReactNode;
  search?: Record<string, any>;
};

export const BackLink = ({ path, children, search }: BackLinkProps) => {
  return (
    <Link to={path} className={styles.back_link} search={search}>
      <ArrowLeftIcon />
      <span>{children}</span>
    </Link>
  );
};
