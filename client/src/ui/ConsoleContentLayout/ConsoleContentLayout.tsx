import { FC, PropsWithChildren } from 'react';
import styles from './ConsoleContentLayout.module.css';

type ConsoleContentLayoutProps = PropsWithChildren;

export const ConsoleContentLayout: FC<ConsoleContentLayoutProps> = ({
  children,
}) => {
  return <div className={styles.contentLayout}>{children}</div>;
};
