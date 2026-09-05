import styles from './content-layout.module.css';

export const ContentLayout = ({ children }: React.PropsWithChildren) => {
  return <div className={styles.content}>{children}</div>;
};
