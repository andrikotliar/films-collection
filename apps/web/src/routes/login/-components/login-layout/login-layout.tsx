import styles from './login-layout.module.css';
import { type ReactNode } from 'react';

type LoginLayoutProps = {
  children: ReactNode;
};

export const LoginLayout = ({ children }: LoginLayoutProps) => {
  return (
    <div className={styles.loginLayout}>
      <div className="max-w-96 w-full">{children}</div>
    </div>
  );
};
