import styles from './about-page-layout.module.css';

export const AboutPageLayout = ({ children }: React.PropsWithChildren) => {
  return <div className={styles.about_page_layout}>{children}</div>;
};
