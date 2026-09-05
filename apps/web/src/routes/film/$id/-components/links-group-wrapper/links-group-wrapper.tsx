import styles from './links-group-wrapper.module.css';

export const LinksGroupWrapper = ({ children }: React.PropsWithChildren) => {
  return <div className={styles.links_group_wrapper}>{children}</div>;
};
