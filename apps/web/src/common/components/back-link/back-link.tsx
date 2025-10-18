import { ArrowLeftIcon } from 'lucide-react';
import { ReactNode } from 'react';
import styles from './back-link.module.css';
import { Link } from '@tanstack/react-router';
import { FileRoutesByTo } from '~/routeTree.gen';

type BackLinkProps = {
  path: keyof FileRoutesByTo;
  children?: ReactNode;
};

export const BackLink = ({ path, children }: BackLinkProps) => {
  return (
    <Link to={path} className={styles.backLink}>
      <ArrowLeftIcon className={styles.backLinkIcon} />
      <span>{children}</span>
    </Link>
  );
};
