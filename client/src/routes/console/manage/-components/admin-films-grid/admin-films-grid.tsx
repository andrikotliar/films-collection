import { FC, PropsWithChildren } from 'react';
import styles from './admin-films-grid.module.css';

type AdminFilmsGridProps = PropsWithChildren;

export const AdminFilmsGrid: FC<AdminFilmsGridProps> = ({ children }) => {
  return <div className={styles.adminFilmsGrid}>{children}</div>;
};
