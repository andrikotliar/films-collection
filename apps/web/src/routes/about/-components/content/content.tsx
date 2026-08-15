import styles from './content.module.css';

export const Content = ({ children }: React.PropsWithChildren) => {
  return <div className={styles.content}>{children}</div>;
};
