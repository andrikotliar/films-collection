import styles from './PendingPageLayout.module.css';
import { FC, PropsWithChildren } from 'react';

type PendingPageLayoutProps = PropsWithChildren;

export const PendingPageLayout: FC<PendingPageLayoutProps> = ({ children }) => {
  return <div className={styles.pendingPageLayout}>{children}</div>;
};
