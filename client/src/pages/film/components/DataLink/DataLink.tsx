import { FC, PropsWithChildren } from 'react';
import { Link } from '@tanstack/react-router';
import styles from './DataLink.module.css';

export type DataLinkProps = {
  path: string;
};

export const DataLink: FC<PropsWithChildren<DataLinkProps>> = ({
  path,
  children,
}) => {
  return (
    <Link to={path} className={styles.link}>
      {children}
    </Link>
  );
};
