import styles from './about-page-content.module.css';

export const AboutPageContent = ({ children }: React.PropsWithChildren) => {
  return <div className={styles.about_page_content}>{children}</div>;
};
