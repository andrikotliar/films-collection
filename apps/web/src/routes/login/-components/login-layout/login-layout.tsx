import styles from './login-layout.module.css';

export const LoginLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className={styles.login_layout}>
      <div className={styles.login_layout_content}>{children}</div>
    </div>
  );
};
