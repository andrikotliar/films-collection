import styles from './content-with-sidebar.module.css';

type ContentWithSidebarProps = {
  children: React.ReactNode;
};

export const ContentWithSidebar = ({ children }: ContentWithSidebarProps) => {
  return <div className={styles.wrapper}>{children}</div>;
};
