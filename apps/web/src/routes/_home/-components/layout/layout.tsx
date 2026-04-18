import styles from './layout.module.css';

type LayoutProps = {
  children?: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return <div className={styles.wrapper}>{children}</div>;
};
