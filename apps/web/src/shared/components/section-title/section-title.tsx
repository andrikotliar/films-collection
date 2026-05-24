import styles from './section-title.module.css';

type SectionTitleProps = {
  children?: React.ReactNode;
};

export const SectionTitle = ({ children }: SectionTitleProps) => {
  return <h2 className={styles.section_title}>{children}</h2>;
};
