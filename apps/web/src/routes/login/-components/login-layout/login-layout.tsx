import styles from './login-layout.module.css';
import { type PropsWithChildren } from 'react';

export const LoginLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className={styles.login_layout}>
      <div className={styles.login_layout_content}>{children}</div>
    </div>
  );
};
