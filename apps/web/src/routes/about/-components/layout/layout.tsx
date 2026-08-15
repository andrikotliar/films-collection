import styles from './layout.module.css';

export const Layout = ({ children }: React.PropsWithChildren) => {
  return <div className={styles.layout}>{children}</div>;
};
