import styles from './tab-wrapper.module.css';

export const TabWrapper = ({ children }: React.PropsWithChildren) => {
  return <div className={styles.tab_wrapper}>{children}</div>;
};
