import styles from './login-layout.module.css';
import { ReactNode } from 'react';

type LoginLayoutProps = {
  children: ReactNode;
};

export const LoginLayout = ({ children }: LoginLayoutProps) => {
  return <div className={styles.loginLayout}>{children}</div>;
};
