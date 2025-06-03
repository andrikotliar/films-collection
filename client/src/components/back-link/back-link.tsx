import { ArrowLeftIcon } from 'lucide-react';
import { FC, PropsWithChildren } from 'react';
import styles from './back-link.module.css';
import { Link } from '@tanstack/react-router';
import { FileRoutesByTo } from '@/routeTree.gen';

type BackLinkProps = PropsWithChildren<{
  path: keyof FileRoutesByTo;
}>;

export const BackLink: FC<BackLinkProps> = ({ path, children }) => {
  return (
    <Link to={path} className={styles.backLink}>
      <ArrowLeftIcon className={styles.backLinkIcon} />
      <span>{children}</span>
    </Link>
  );
};
