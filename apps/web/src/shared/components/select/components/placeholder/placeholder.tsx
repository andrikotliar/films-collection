import styles from './placeholder.module.css';

export const Placeholder = ({ children }: React.PropsWithChildren) => {
  return <div className={styles.placeholder}>{children}</div>;
};
