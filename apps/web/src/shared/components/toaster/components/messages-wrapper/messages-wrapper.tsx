import styles from './messages-wrapper.module.css';

export const MessagesWrapper = ({ children }: React.PropsWithChildren) => {
  return <div className={styles.wrapper}>{children}</div>;
};
