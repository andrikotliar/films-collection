import styles from './LoginLayout.module.css';
import { FC, PropsWithChildren } from 'react';

export const LoginLayout: FC<PropsWithChildren> = ({ children }) => {
  return <div className={styles.loginLayout}>{children}</div>;
};
