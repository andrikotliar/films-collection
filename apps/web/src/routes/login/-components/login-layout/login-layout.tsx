import styles from './styles.module.css';
import { type PropsWithChildren } from 'react';

type LoginLayoutProps = PropsWithChildren;

export const LoginLayout = ({ children }: LoginLayoutProps) => {
  return (
    <div className={styles.login_layout}>
      <div className={styles.login_layout_content}>{children}</div>
    </div>
  );
};
