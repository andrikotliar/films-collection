import { ArrowLeftIcon } from 'lucide-react';
import { type PropsWithChildren } from 'react';
import styles from './styles.module.css';
import { Link } from '@tanstack/react-router';
import type { FileRoutesByTo } from '~/routeTree.gen';

type Props = {
  path: keyof FileRoutesByTo;
};

export const BackLink = ({ path, children }: PropsWithChildren<Props>) => {
  return (
    <Link to={path} className={styles.back_link}>
      <ArrowLeftIcon />
      <span>{children}</span>
    </Link>
  );
};
