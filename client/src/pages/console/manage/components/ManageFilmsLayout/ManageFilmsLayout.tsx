import { FC, PropsWithChildren } from 'react';
import styles from './ManageFilmsLayout.module.css';

type ManageFilmsLayoutProps = PropsWithChildren;

export const ManageFilmsLayout: FC<ManageFilmsLayoutProps> = ({ children }) => {
  return <div className={styles.layout}>{children}</div>;
};
